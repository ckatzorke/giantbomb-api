"use strict";
const chai = require("chai");
const giantbomb_1 = require("../app/giantbomb");
const expect = chai.expect;
describe('Test for presence of apikey', () => {
    const ERROR = 'API key is needed for Giantbomb, please set as environment variable.';
    it('should throw an error w/ null api key', () => {
        expect(() => new giantbomb_1.default(null))
            .to.throw(Error, ERROR);
    });
    it('should throw an error w/ undefined api key', () => {
        expect(() => new giantbomb_1.default(undefined))
            .to.throw(Error, ERROR);
    });
    it('should throw an error w/ empty api key', () => {
        expect(() => new giantbomb_1.default(''))
            .to.throw(Error, ERROR);
    });
    it('should return a proper instance with api key', () => {
        expect(() => new giantbomb_1.default('abc'))
            .to.not.throw(Error);
    });
});
describe('Test for search', () => {
});
