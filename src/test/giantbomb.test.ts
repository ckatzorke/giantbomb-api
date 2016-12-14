import * as mocha from 'mocha';
import * as chai from 'chai';

import { Giantbomb, Platform } from '../app/giantbomb';

const expect = chai.expect;
describe('Giantbomb tests', () => {

  describe('Test for presence of apikey', () => {
    const ERROR = 'API key is needed for Giantbomb, please set as environment variable.';

    it('should throw an error w/ null api key', () => {
      expect(() => new Giantbomb(null))
        .to.throw(Error, ERROR);
    });
    it('should throw an error w/ undefined api key', () => {
      expect(() => new Giantbomb(undefined))
        .to.throw(Error, ERROR);
    });
    it('should throw an error w/ empty api key', () => {
      expect(() => new Giantbomb(''))
        .to.throw(Error, ERROR);
    });

    it('should return a proper instance with api key', () => {
      expect(() => new Giantbomb('abc'))
        .to.not.throw(Error);
    });
  });


});
