"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
//quicksearch for multi hits, iterating over results
const giantbomb_1 = require("../app/giantbomb");
let gb = new giantbomb_1.default(process.env.GIANTBOMB_APIKEY);
search();
function search() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log('Searching for "Dark Souls"...');
            let searchResults = yield gb.quickSearch('"Dark Souls"');
            console.log(`Found ${searchResults.results.length} results`);
            console.info('=============================');
            for (let game of searchResults.results) {
                console.log(`${game.id}\t${game.name}`);
            }
        }
        catch (error) {
            console.error('Error during execution chain: ', error, error.stack);
        }
    });
}
