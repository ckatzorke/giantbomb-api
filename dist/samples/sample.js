"use strict";
const giantbomb_1 = require("../app/giantbomb");
let gb = new giantbomb_1.default(process.env.GIANTBOMB_APIKEY);
gb.quickSearch('Dark Souls')
    .then(data => console.log(`results:${data.number_of_total_results}`))
    .catch(e => console.error(e));
