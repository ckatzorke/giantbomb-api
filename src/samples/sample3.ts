//Getting all games for a platform, using an Iterator
import { Giantbomb, Platform } from '../app/giantbomb';

let gb = new Giantbomb(process.env.GIANTBOMB_APIKEY);

iterateAllVirtualBoyGames();

async function iterateAllVirtualBoyGames() {
  try {
    console.log('Identifying all games for VBoy');
    const vbGames = await gb.gamesForPlatform(Platform.VIRTUALBOY);
    console.log('Number of Games:', vbGames.length);
    for(let game of vbGames){
      console.log(game.name);
    }
  } catch (error) {
    console.error('Error during execution chain: ', error, error.stack);
  }
}

