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



    var nameSearch = function (searchString) {
        console.error('searching for', searchString);
        var searchQS = _.extend(_.clone(qsDefaults), {
                'filter': 'name:' + searchString,
                'field_list': 'api_detail_url,id,name,deck,image,original_release_date'
            }),
            searchOptions = _.clone(options);
        
        searchOptions.url = options.url + '/games';
        searchOptions.qs = searchQS;

        console.log('searchOptions', searchOptions);

        var searchReq = new Promise(function (resolve, reject) {
            request(searchOptions, function (error, response, body) {
                if (!error) {
                    console.log(response.statusCode);
                    console.log(response.headers['content-type']);
                    var result = JSON.parse(body);
                    resolve(result);
                } else {
                    console.log("Got error: " + error.message);
                    reject(error); //TODO
                }
            });
        });
        return searchReq;
    };

    return {
        /**
         * @name search
         * @param searchString the query to search for, e.g. Battlefield
         * @desc a simple name based fulltext search
         */
        'search': function (searchString) {
            return nameSearch(searchString);
        }
    };
};

module.exports = gbAPI;