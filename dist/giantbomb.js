"use strict";
class Giantbomb {
    constructor(apikey) {
        this.apikey = apikey;
        this.httpDefaultOptions = {
            url: 'http://www.giantbomb.com/api',
            headers: {
                'User-Agent': 'giantbomb-node; node search client by Christian Katzorke'
            },
            method: 'GET',
            qs: {
                'api_key': this.apikey,
                'limit': 100,
                'offset': 0,
                'sort': '',
                'field_list': 'id,name,aliases,deck,image,images,original_release_date,developers,genres,publishers,platforms,site_detail_url,date_last_updated',
                'format': 'json'
            }
        };
        console.log('construct', this.httpDefaultOptions);
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Giantbomb;
