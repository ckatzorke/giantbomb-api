//quicksearch for a single game
import Giantbomb from '../app/giantbomb';

let gb = new Giantbomb(process.env.GIANTBOMB_APIKEY);


async function searchDOTT(){
  try{
    let searchResults = await gb.quickSearch('"Day of the Tentacle"')
    let dottId = searchResults.results[0].id;
    console.log('Found ' + searchResults.results.length + ' results (should be 1, loading details for 1st entry). Loading details for id=' + dottId);
    /*
    let dott = await gb.details(dottId);
    console.info('Details for ' + dott.name);
    console.info('=============================');
    console.info(dott.deck);
    */
  } catch(error) {
    console.error('Error during execution chain: ', error, error.stack);
  }
}

searchDOTT();
