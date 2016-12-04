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
        let qsCopy = this.copyObject(this.qs);
        return new HttpOptions(this.url, qsCopy, this.method);
    }
    copyObject(object) {
        var objectCopy = {};
        for (var key in object) {
            if (object.hasOwnProperty(key)) {
                objectCopy[key] = object[key];
            }
        }
        return objectCopy;
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = HttpOptions;
