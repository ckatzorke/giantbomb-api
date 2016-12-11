import * as mocha from 'mocha';
import * as chai from 'chai';

import Giantbomb from '../app/giantbomb';

const expect = chai.expect;

describe('Test for presence of apikey', () => {

  it('should throw an error w/ null api key', () => {
    expect(() => new Giantbomb(null))
      .to.throw(Error, 'invalid api key');
  });
  it('should throw an error w/ undefined api key', () => {
    expect(() => new Giantbomb(undefined))
      .to.throw(Error, 'invalid api key');
  });
  it('should throw an error w/ empty api key', () => {
    expect(() => new Giantbomb(''))
      .to.throw(Error, 'invalid api key');
  });

  it('should return a proper instance with api key', () => {
    expect(() => new Giantbomb('abc'))
      .to.not.throw(Error);
  });
});
