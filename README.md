# giantbomb-api
Project makes use of EcmaScript 6 features, so io.js is required to run the api (node --harmony will work when node supports template strings).

## run

    npm install
    iojs sample.js

The sample performs a quick search for "Day of the Tentacle" and subsequently fetches the details for DOTT.

## How to set the api key

Giantbomb needs an API key. Since I do not want to check in this information, the sample.js file requires an apikey.js file in the root directory. This file is included in .gitignore, so create one on your own, containing following content
    
    module.exports = '<your_api_key_here';

## tests

Using mmocha and nock for tests, ssee src/test for test cases

## usage of gb.games

    var apikey = require('./apikey'); // <- your apikey, see above
    var gb = require('giantbomb-api')(apikey); // <- initialize gb api wrapper
        
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

    gb.detail(4072)
     