# giantbomb-api
Project makes use of EcmaScript 6 features, so io.js or node >0.11 with --harmony is required to run the api.

## run

    npm install
    iojs sample.js

The sample performs a quick search for "Day of the Tentacle" and subsequently fetches the details for DOTT.

## How to set the api key

Giantbomb needs an API key. Since I do not want to check in this information, the sample.js file requires an apikey.js file in the root directory. This file is included in .gitignore, so create one on your own, containing following content
    
    module.exports = '<your_api_key_here';
