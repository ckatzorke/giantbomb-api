"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
//Getting all games for a platform, using an Iterator
const giantbomb_1 = require("../app/giantbomb");
let gb = new giantbomb_1.Giantbomb(process.env.GIANTBOMB_APIKEY);
iterateAllVirtualBoyGames();
function iterateAllVirtualBoyGames() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log('Identifying all games for VBoy');
            const vbGames = yield gb.gamesForPlatform(giantbomb_1.Platform.VIRTUALBOY);
            console.log('Number of Games:', vbGames.length);
            for (let game of vbGames) {
                console.log(game.name);
            }
        }
        catch (error) {
            console.error('Error during execution chain: ', error, error.stack);
        }
    });
}
