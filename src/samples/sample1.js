/*jslint node: true, nomen: true */
//quicksearch for a single game

'use strict';
var apikey = require('../apikey');
var gb = require('../giantbomb.js')(apikey);

console.log('Defaults=', gb.defaults);
gb.quicksearch('Day of the Tentacle').then(function (result) {
    var id = result.results[0].id;
    console.log('Found ' + result.results.length + ' results (should be 1, loading details for 1st entry). Loading details for id=' + id);
    return gb.detail(id);
}).then(function (detail) {
    console.info('Details for ' + detail.name);
    console.info('=============================');
    console.info(detail.deck);
}).catch(function (error) {
    console.error('Error during execution chain: ', error, error.stack);
});
