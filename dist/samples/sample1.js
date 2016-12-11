"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
//quicksearch for a single game, getting details for it
const giantbomb_1 = require("../app/giantbomb");
let gb = new giantbomb_1.default(process.env.GIANTBOMB_APIKEY);
function searchDOTT() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let searchResults = yield gb.quickSearch('"Day of the Tentacle"');
            let dottId = searchResults.results[0].id;
            console.log('Found ' + searchResults.results.length + ' results (should be 1, loading details for 1st entry). Loading details for id=' + dottId);
            let dott = yield gb.details(dottId);
            console.info('Details for ' + dott.name);
            console.info('=============================');
            console.info(dott.deck);
        }
        catch (error) {
            console.error('Error during execution chain: ', error, error.stack);
        }
    });
}
searchDOTT();
