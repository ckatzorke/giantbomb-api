"use strict";
class QueryStringBuilder {
    constructor() {
        this.qs = new Map();
    }
    addQueryStringParameter(key, value) {
        this.qs.set(key, value);
        return this;
    }
    build() {
        let query = {};
        this.qs.forEach((value, key) => {
            query[key] = this.qs.get(key);
        });
        return query;
    }
}
exports.QueryStringBuilder = QueryStringBuilder;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = QueryStringBuilder;
