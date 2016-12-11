import * as mocha from 'mocha';
import * as chai from 'chai';

import HttpOptions from '../app/httpoptions';
import { QueryStringBuilder } from '../app/querystring';

const expect = chai.expect;
const assert = chai.assert;

describe('Tests for HttpOptions', () => {
  function createOptions() {
    let qs = new QueryStringBuilder().addQueryStringParameter('api_key', 'testapikey')
      .addQueryStringParameter('limit', 100)
      .addQueryStringParameter('offset', 0)
      .addQueryStringParameter('sort', '')
      .addQueryStringParameter('field_list', 'id,name,description,aliases,deck,image,images,original_release_date,developers,genres,publishers,platforms,site_detail_url,date_last_updated')
      .addQueryStringParameter('format', 'json').build();
    return new HttpOptions('http://www.giantbomb.com/api', qs);
  }

  it('Should create valid HttpOptions', () => {
    const options = createOptions();
    assert.isNotNull(options);
    assert.strictEqual('http://www.giantbomb.com/api', options.url);
  });

  it('Modify should work', () => {
    const options = createOptions();
    options.url = 'http://www.google.com';
    options.qs['filter'] = 'platform:35';
    assert.strictEqual('http://www.google.com', options.url);
    assert.strictEqual('platform:35', options.qs['filter']);
  });

  it('#clone should return a new object', () => {
    const options = createOptions();
    const options2 = options.clone();
    assert.notStrictEqual(options, options2);
  });
  it('#clone - modifiy clone must not change original values', () => {
    const options = createOptions();
    const options2 = options.clone();
    options2.url = 'http://www.google.com';
    options2.qs['limit'] = 66;
    options2.qs['filter'] = 'platform:35';
    assert.strictEqual('http://www.giantbomb.com/api', options.url);
    assert.strictEqual(100, options.qs['limit']);
    assert.isUndefined(options.qs['filter']);
  });
});
