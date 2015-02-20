/*jslint node: true, nomen: true */
'use strict';
var apikey = require('./apikey');
var gb = require('./src/app/giantbomb.js')(apikey);

gb.search('Day of the Tentacle').then(function (result) {
    var id = result.results[0].id;
    console.log(`Found ${result.number_of_total_results} results (should be 1, loading details for 1st entry). Loading details for id=${id}`);
    return gb.detail(id);
}).then(function (detail) {
    console.info(`Details for ${detail.name}`);
    console.info('=============================');
    console.info(detail.deck);
}).catch(function (error) {
    console.error("Error during execution chain: ", error);
});