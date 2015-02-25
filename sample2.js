/*jslint node: true, nomen: true */
//quicksearch with a searchstring that won't find anything

'use strict';
var apikey = require('./apikey');
var gb = require('./src/app/giantbomb.js')(apikey);

gb.quicksearch('Nixzufinden').then(function (result) {
    console.log('Found ' + result.length + ' results (should be 0)');
}).catch(function (error) {
    console.error('Error during execution chain: ', error, error.stack);
});