/*jslint node: true, nomen: true */
//games abstraction example. Search for all games of virtualboy (id=79), ps4 id=146

'use strict';
var apikey = require('./apikey');
var gb = require('./src/app/giantbomb.js')(apikey);

console.log('Getting all games for virtual boy...');
gb.games({
    filter: {
        platforms: 79
    }
}).then(function (result) {
    console.log('found ' + result.length + ' games for VirtualBoy');
    console.log('Getting all games for PS4...');
    return gb.games({
        filter: {
            platforms: 146
        }
    });
}).then(function (result) {
    console.log('found ' + result.length + ' games for ps4');
}).
catch(function (error) {
    console.error("Error during execution chain: ", error, error.stack);
});