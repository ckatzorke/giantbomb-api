/*jslint node: true, nomen: true */
'use strict';
var apikey = require('./apikey');
var gb = require('./src/app/giantbomb.js')(apikey);
gb.search('Battlefield').then(function (result) {
    console.log('Found ' + result.number_of_total_results + ' results');
});