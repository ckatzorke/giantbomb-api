/*jslint node: true, nomen: true */
var request = require('request'),
    _ = require('underscore');
/**
 * Designed as stateless prototype scoped service, not a protitypable JS instance
 */
var gbAPI = function (apikey) {
    "use strict";
    var gbapikey = apikey;

    //giantbomb http options
    var options = {
            url: 'http://www.giantbomb.com/api',
            method: 'GET'
        },
        qsDefaults = {
            'api_key': gbapikey,
            'format': 'json'
        },
        fields = {
            'field_list': 'name,id,aliases,genres,image,original_release_date,releases,platforms,api_detail_url,site_detail_url'
        };
    //util, get the response check for transport errors, and logical errors (from giantbomb in JSON), if an error occured the promise will be rejected, in case of success the JSON object is returned
    var responseHandler = function (reject, error, response, body) {
        if (!error) {
            var result = JSON.parse(body);
            if (result.error !== 'OK') {
                reject(new Error(result.error));
            }
            return result;
        } else {
            console.error("Got error: " + error.message);
            reject(error); //TODO
        }
    };

    //search for name
    var nameSearch = function (searchString) {
        console.info('searching for', searchString);
        var searchQS = _.extend(_.clone(qsDefaults), {
                'filter': 'name:' + searchString,
                'field_list': 'api_detail_url,id,name,deck,image,original_release_date'
            }),
            searchOptions = _.clone(options);

        searchOptions.url = options.url + '/games';
        searchOptions.qs = searchQS;

        //console.info('searchOptions', searchOptions);

        var searchReq = new Promise(function (resolve, reject) {
            request(searchOptions, function (error, response, body) {
                var result = responseHandler(reject, error, response, body);
                //only need to resolve since rejects are handled by resonsehandler
                resolve(result);
            });
        });
        return searchReq;
    };

    //show details
    var gameDetail = function (gameId) {
        console.info('Loading details for id: ' + gameId);
        var detailOptions = _.clone(options);
        detailOptions.url = options.url + '/game/3030-' + gameId;
        detailOptions.qs = qsDefaults;
        //console.info('detailOptions', detailOptions);
        var detailsReq = new Promise(function (resolve, reject) {
            request(detailOptions, function (error, response, body) {
                var result = responseHandler(reject, error, response, body);
                //check if a game has been returned
                if (result.number_of_total_results !== 1) {
                    reject(new Error('ID ' + gameId + ' seems not to be a valid ID!'));
                }
                resolve(result.results);
            });
        });
        return detailsReq;
    };



    return {
        /**
         * @name search
         * @desc a simple name based fulltext search
         * @param searchString the query to search for, e.g. Battlefield. Wildcards are not required, and will be interpreted as a search term
         * @return a Promise for the search, that resolves the JSON object when successful.  The JSON is currently as-is, i.e. as returned from GiantBomb
         */
        'search': function (searchString) {
            return nameSearch(searchString);
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