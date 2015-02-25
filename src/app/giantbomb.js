/*jslint node: true,  nomen: true */
var request = require('request'),
    _ = require('underscore'),
    log4js = require('log4js');

/**
 * Ze logger
 */
var logger = log4js.getLogger();


/**
 * push array elements into an arry
 */
Array.prototype.pushArray = function () {
    this.push.apply(this, this.concat.apply([], arguments));
};
/**
 * Designed as stateless prototype scoped service, not a protitypable JS instance
 */
var gbAPI = function (apikey) {
    'use strict';
    var gbapikey = apikey;

    //giantbomb http options
    var httpDefaultOptions = {
            url: 'http://www.giantbomb.com/api',
            method: 'GET'
        },
        queryStringDefault = {
            'api_key': gbapikey,
            'format': 'json'
        };
    //util, get the response check for transport errors, and logical errors (from giantbomb in JSON), if an error occured the promise will be rejected, in case of success the JSON object is returned
    var responseHandler = function (reject, error, response, body) {
        if (!error) {
            let result = JSON.parse(body);
            if (result.error !== 'OK') {
                reject(new Error(result.error));
            }
            return result;
        } else {
            logger.fatal('Got error: ' + error.message, error);
            reject(error); //TODO
        }
    };

    //quicksearch for name
    var nameSearch = function (searchString) {
        return games({
            'filter': {
                'name': searchString
            }
        });
    };

    //show details
    var gameDetail = function (gameId) {
        logger.debug('Loading details for id ' + gameId);
        let detailQS = _.extend(_.clone(queryStringDefault), {
                'field_list': 'id,name,aliases,deck,description,image,images,original_release_date,developers,genres,publishers,platforms,site_detail_url,date_last_updated'
            }),
            detailOptions = _.clone(httpDefaultOptions);
        detailOptions.url = httpDefaultOptions.url + '/game/3030-' + gameId;
        detailOptions.qs = detailQS;
        //console.info('detailOptions', detailOptions);
        let detailsReq = new Promise(function (resolve, reject) {
            request(detailOptions, function (error, response, body) {
                let result = responseHandler(reject, error, response, body);
                //check if a game has been returned
                if (result.number_of_total_results !== 1) {
                    reject(new Error('ID ' + gameId + ' seems not to be a valid ID!'));
                }
                resolve(result.results);
            });
        });
        return detailsReq;
    };

    var games = function (opt) {
        //TODO when options undefined
        var options = opt || {};
        var filterString = '';
        if (options.filter) {
            var firstFilter = true;
            for (let property in options.filter) {
                if (options.filter.hasOwnProperty(property)) {
                    if (firstFilter) {
                        firstFilter = false;
                    } else {
                        filterString += '|';
                    }
                    filterString += property + ':' + options.filter[property];
                }
            }
        }
        var gamesQS = _.extend(_.clone(queryStringDefault), {
                'filter': filterString,
                'field_list': 'id,name,aliases,deck,description,image,images,original_release_date,developers,genres,publishers,platforms,site_detail_url,date_last_updated'
            }),
            gamesHttpOptions = _.clone(httpDefaultOptions);

        gamesHttpOptions.url = httpDefaultOptions.url + '/games';
        gamesHttpOptions.qs = gamesQS;
        logger.debug('gamesHttpOptions', JSON.stringify(gamesHttpOptions, null, 2));

        let gamesReq = new Promise(function (resolve, reject) {
            request(gamesHttpOptions, function (error, response, body) {
                var result = responseHandler(reject, error, response, body);
                var pagedResultsCount = result.number_of_page_results;
                var totalresultsCount = result.number_of_total_results;
                var pages = Math.ceil(totalresultsCount / result.limit);
                logger.debug('Number of total results: ' + totalresultsCount + ', number of pages pages');

                //make potentially additional requests, if  pages > 1
                var subRequests = [];
                for (let i = 1; i < pages; i++) {
                    let offset = result.limit * (i);
                    gamesHttpOptions.qs.offset = offset;
                    logger.debug('Getting next page ' + (i + 1) + '/' + pages + '... gamesHttpOptions:', JSON.stringify(gamesHttpOptions, null, 2));
                    subRequests.push(new Promise(function (resolve, reject) {
                        request(gamesHttpOptions, function (error, response, body) {
                            let nextResult = responseHandler(reject, error, response, body);
                            logger.debug('Resolving ' + nextResult.results.length + ' entries');
                            result.results.pushArray(nextResult.results);
                            //resolve the array
                            resolve();
                        });
                    }));
                }
                Promise.all(subRequests).then(function () {
                    logger.debug('All done.');
                    logger.debug('Done. Got a total of ' + result.results.length + ' entries');
                    //only need to resolve since rejects are handled by resonsehandler
                    resolve(result.results);
                });

            });
        });
        return gamesReq;
    };


    return {
        /**
         * @name quicksearch
         * @desc a simple name based 'fulltext' search (not really)
         * @param searchString the query to search for, e.g. 'Battlefield'. Wildcards are not required, and will be interpreted as a search term
         * @return a Promise for the search, that resolves the an array of games objects when successful
         */
        'quicksearch': function (searchString) {
            return nameSearch(searchString);
        },
        /**
         * @name games
         * @desc an abstraction of the games resource
         * @param options
         * @return a Promise for the search, that resolves the JSON object when successful.  The JSON is currently as-is, i.e. as returned from GiantBomb
         */
        'games': function (options) {
            return games(options);
        },
        /**
         * @name detail
         * @desc load the game details for given id from GiantBomb and returns the details with all fields provide from GiantBomb
         * @param id the id for getting the game details from GiantBomb
         * @return a Promise for the details, that resolves as the JSON object when successful. Only the results field from the api call is returned as SON, containig all fields
         */
        'detail': function (gameId) {
            return gameDetail(gameId);
        }
    };
};

module.exports = gbAPI;