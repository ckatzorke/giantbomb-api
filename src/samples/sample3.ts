//quicksearch for multi hits (more fuzzy) with additional platform filter, iterating over results
import Giantbomb from '../app/giantbomb';

let gb = new Giantbomb(process.env.GIANTBOMB_APIKEY);

search();

async function search() {
  try {
    console.log('Searching for "Dark Souls"...');
    let filter = new Map<string, string>();
    filter.set('platforms', '146');
    let searchResults = await gb.quickSearch('Dark Souls', filter);
    console.log(`Found ${searchResults.results.length} results`);
    console.info('=============================');
    for (let game of searchResults.results) {
      console.log(`${game.id}\t${game.name}`);
    }
  } catch (error) {
    console.error('Error during execution chain: ', error, error.stack);
  }
}

