"use strict";
const chai = require("chai");
const querystring_1 = require("../app/querystring");
const expect = chai.expect;
const assert = chai.assert;
describe('Tests for QueryStringBuilder', () => {
    function createQSB() {
        return new querystring_1.QueryStringBuilder().addQueryStringParameter('api_key', 'testapikey')
            .addQueryStringParameter('limit', 66)
            .addQueryStringParameter('offset', 10)
            .addQueryStringParameter('sort', '')
            .addQueryStringParameter('field_list', 'id,name,description,aliases,deck,image,images,original_release_date,developers,genres,publishers,platforms,site_detail_url,date_last_updated')
            .addQueryStringParameter('format', 'json');
    }
    it('should create a QueryString', () => {
        const qsb = createQSB();
        const qs = qsb.build();
        assert.isNotNull(qs);
        assert.isOk(qs);
    });
    it('should contain proper values', () => {
        const qsb = createQSB();
        const qs = qsb.build();
        assert.strictEqual(qs['limit'], 66);
        assert.strictEqual(qs['format'], 'json');
        assert.isUndefined(qs['notset']);
    });
});
