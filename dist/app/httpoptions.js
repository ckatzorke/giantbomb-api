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
        return new HttpOptions(this.url, this.qs, this.method);
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = HttpOptions;
