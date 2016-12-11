"use strict";
class HttpOptions {
    constructor(url, qs, method = "GET") {
        this.url = url;
        this.qs = qs;
        this.method = method;
        this.headers = {
            'User-Agent': 'giantbomb-node-typescript; node search client by Christian Katzorke'
        };
        this.throwResponseError = true;
    }
    clone() {
        let qsCopy = Object.assign({}, this.qs); //{ ...this.qs }; //<- not working yet? ts 2.1, es2017
        return new HttpOptions(this.url, qsCopy, this.method);
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = HttpOptions;
