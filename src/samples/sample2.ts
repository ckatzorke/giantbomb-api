//quicksearch for multi hits, iterating over results
import Giantbomb from '../app/giantbomb';

let gb = new Giantbomb(process.env.GIANTBOMB_APIKEY);

search();

async function search(){
  try{
    console.log('Searching for "Dark Souls"...');
    let searchResults = await gb.quickSearch('"Dark Souls"')
    console.log(`Found ${searchResults.results.length} results`);
    console.info('=============================');
    for(let game of searchResults.results){
      console.log(`${game.id}\t${game.name}`);
    }
  } catch(error) {
    console.error('Error during execution chain: ', error, error.stack);
  }
}

