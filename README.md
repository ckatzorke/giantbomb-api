# giantbomb-api
Project makes use of EcmaScript 6 features, so io.js is required to run the api (node --harmony will work when node supports template strings).

## How to set the api key

Giantbomb needs an API key. Since I do not want to check in this information, the sample[123].js file requires an apikey.js file in the _src/app_ directory. This file is included in .gitignore, so create one on your own, containing following content

    module.exports = '<your_api_key_here';

## run cli samples

    npm install
    node src/app/sample[123].js

The sample performs a quick search for "Day of the Tentacle" and subsequently fetches the details for DOTT.

## run koa middleware for embedded rest service

    npm server

Watch the output, the server is created, bound to _localhost:3000_ with the endpoints

    /gb/search?q={query}
    /gb/detail/:id

## tests

Using mmocha and nock for tests, see src/test for test cases

# How to use

## general usage

    var apikey = require('./apikey'); // <- your apikey, see above
    var gb = require('giantbomb-api')(apikey); // <- initialize gb api wrapper

## usage of gb.games

    gb.games(options); //games resource abstraction

### options

Example: filter by name 'resident evil', return all entries (paging=false, limit=100)

    {
        filter: {
            name: 'resident evil'
        }
    }

result

     {totalResults: 29, results: Array[29]}

Example: filter by platform 146 (=PS4), return only one entry (the first)

    {
        filter: {
            platforms: 146
        },
        limit: 1,
        offset: 0,
        paging: true
    }

result

     {totalResults: 1, results: Array[1]}

## usage of gb.details

Example: Load all details for id=4072 (DOTT)

    gb.detail(4072);

## usage of gb.quicksearch

Example: Search for Bloodborne

    gb.quicksearch('bloodborne');
