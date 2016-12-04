import Giantbomb from '../app/giantbomb';

let gb = new Giantbomb(process.env.GIANTBOMB_APIKEY);
gb.quickSearch('Dark Souls')
  .then(data => console.log(`results:${data.number_of_total_results}`))
  .catch(e => console.error(e));

