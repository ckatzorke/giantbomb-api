"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const httpoptions_1 = require("./httpoptions");
const querystring_1 = require("./querystring");
const request = require("web-request");
/**
 * Wrapper class for <a href="http://www.giantbomb.com">Giantbomb</a> REST API.
 */
class Giantbomb {
    /**
     * @constructor
     * @param {string} apikey - the Giantbomb API key
     * @throws an Error when no apikey (null, "" or undefined) is passed
     */
    constructor(apikey) {
        this.apikey = apikey;
        if (!apikey) {
            throw new Error('API key is needed for Giantbomb, please set as environment variable.');
        }
        let qs = new querystring_1.QueryStringBuilder().addQueryStringParameter('api_key', this.apikey)
            .addQueryStringParameter('limit', 100)
            .addQueryStringParameter('offset', 0)
            .addQueryStringParameter('sort', '')
            .addQueryStringParameter('field_list', 'id,name,description,aliases,deck,image,images,original_release_date,developers,genres,publishers,platforms,site_detail_url,date_last_updated')
            .addQueryStringParameter('format', 'json').build();
        this.httpDefaultOptions = new httpoptions_1.default('http://www.giantbomb.com/api', qs);
    }
    /**
     * @param {string} searchString
     * @return a Promise with the json result
     * @TODO use typed response, not any
     */
    quickSearch(searchString) {
        return __awaiter(this, void 0, void 0, function* () {
            let searchOptions = this.httpDefaultOptions.clone();
            searchOptions.url += '/search';
            searchOptions.qs.query = searchString;
            searchOptions.qs.resources = 'game';
            searchOptions.qs.field_list = 'id,name,deck,image,platforms';
            let result = yield this.execute(searchOptions);
            //filtering not possible with /search endpoint filter has to be applied afterwards
            return result;
        });
    }
    /**
     * @return a Promise with the json result
     * @TODO use typed response, not any
     */
    details(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let detailsOptions = this.httpDefaultOptions.clone();
            detailsOptions.url += `/game/3030-${id}`;
            detailsOptions.qs.field_list = '';
            let result = yield this.execute(detailsOptions);
            //if found, extract results directly
            if (result.number_of_total_results === 0) {
                result = null;
            }
            else {
                result = result.results;
            }
            return result;
        });
    }
    /**
     * abstraction/simplification for /games resource, but returns all games
     */
    gamesForPlatform(platform) {
        return __awaiter(this, void 0, void 0, function* () {
            let gamesOptions = this.httpDefaultOptions.clone();
            gamesOptions.url += `/games`;
            gamesOptions.qs.platforms = `${platform.id}`;
            gamesOptions.qs.field_list = 'id,name,deck,image';
            let result = new Array();
            let offset = 0;
            let finished = false;
            while (!finished) {
                let response = yield this.execute(gamesOptions);
                let pageSize = response.number_of_page_results;
                let totalSize = response.number_of_total_results;
                result.push(...response.results);
                offset += pageSize;
                if (offset >= totalSize) {
                    finished = true;
                }
                gamesOptions.qs.offset = offset;
            }
            return result;
        });
    }
    execute(options) {
        return __awaiter(this, void 0, void 0, function* () {
            //request.debug(true);
            //this.handleFilter(options, filter);
            console.log('Options:', options);
            try {
                let result = yield request.json(options.url, options);
                if (result.error !== 'OK') {
                    new Error(result.error);
                }
                return result;
            }
            catch (e) {
                throw e;
            }
        });
    }
    handleFilter(options, filter = null) {
        if (filter !== null) {
            let filterString = '';
            let firstFilter = true;
            for (let property in filter) {
                if (firstFilter) {
                    firstFilter = false;
                }
                else {
                    filterString += '|';
                }
                filterString += property + ':' + filter[property];
            }
            options.qs.filter = filterString;
        }
    }
}
exports.Giantbomb = Giantbomb;
class Platform {
    constructor(id, name, short) {
        this.id = id;
        this.name = name;
        this.short = short;
    }
}
Platform.PS4 = new Platform(146, "Playstation 4", "PS4");
Platform.VIRTUALBOY = new Platform(79, "Virtual Boy", "VBoy");
exports.Platform = Platform;
class GameIndex {
    constructor(id, name, deck, images) {
        this.id = id;
        this.name = name;
        this.deck = deck;
        this.images = images;
    }
}
exports.GameIndex = GameIndex;
Object.defineProperty(exports, "__esModule", { value: true });
//util, get the response check for transport errors, and logical errors (from giantbomb in JSON), if an error occured the promise will be rejected, in case of success the JSON object is returned
exports.default = Giantbomb;
