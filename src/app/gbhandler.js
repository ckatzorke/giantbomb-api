/*jslint node: true, nomen: true */

'use strict';

var apikey = require('./apikey');
var gb = require('./giantbomb')(apikey);
/**
 * search
 */
exports.search = function * () {
    if (this.request.query.q) {
        var res = yield gb.quicksearch(this.request.query.q);
        this.body = res;
    } else {
        this.response.status = 404;
    }
};
/**
 * details
 */
exports.detail = function * (id) {
    if (id) {
        var res = yield gb.detail(id);
        this.body = res;
    } else {
        this.response.status = 404;
    }
};
