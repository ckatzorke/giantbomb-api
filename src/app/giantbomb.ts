import HttpOptions from './httpoptions';
import { QueryStringBuilder } from './querystring';
import * as request from 'web-request';

/**
 * Wrapper class for <a href="http://www.giantbomb.com">Giantbomb</a> REST API. 
 */
export class Giantbomb {

  private httpDefaultOptions: HttpOptions;

  /**
   * @constructor 
   * @param {string} apikey - the Giantbomb API key
   * @throws an Error when no apikey (null, "" or undefined) is passed
   */
  constructor(private apikey: string) {
    if (!apikey) {
      throw new Error('API key is needed for Giantbomb, please set as environment variable.');
    }
    let qs = new QueryStringBuilder().addQueryStringParameter('api_key', this.apikey)
      .addQueryStringParameter('limit', 100)
      .addQueryStringParameter('offset', 0)
      .addQueryStringParameter('sort', '')
      .addQueryStringParameter('field_list', 'id,name,description,aliases,deck,image,images,original_release_date,developers,genres,publishers,platforms,site_detail_url,date_last_updated')
      .addQueryStringParameter('format', 'json').build();
    this.httpDefaultOptions = new HttpOptions('http://www.giantbomb.com/api', qs);
  }

  /**
   * @param {string} searchString
   * @return a Promise with the json result
   * @TODO use typed response, not any
   */
  public async quickSearch(searchString: string): Promise<any> {
    let searchOptions = this.httpDefaultOptions.clone();
    searchOptions.url += '/search';
    searchOptions.qs.query = searchString;
    searchOptions.qs.resources = 'game';
    searchOptions.qs.field_list = 'id,name,deck,image,platforms';
    let result = await this.execute(searchOptions);
    //filtering not possible with /search endpoint filter has to be applied afterwards
    return result;
  }

  /**
   * @return a Promise with the json result
   * @TODO use typed response, not any
   */
  public async details(id: string): Promise<any> {
    let detailsOptions = this.httpDefaultOptions.clone();
    detailsOptions.url += `/game/3030-${id}`;
    detailsOptions.qs.field_list = '';
    let result = await this.execute(detailsOptions);
    //if found, extract results directly
    if (result.number_of_total_results === 0) {
      result = null;
    } else {
      result = result.results;
    }
    return result;
  }

  /**
   * abstraction/simplification for /games resource, but returns all games
   */
  public async gamesForPlatform(platform: Platform): Promise<Array<GameIndex>> {
    let gamesOptions = this.httpDefaultOptions.clone();
    gamesOptions.url += `/games`;
    gamesOptions.qs.platforms = `${platform.id}`;
    gamesOptions.qs.field_list = 'id,name,deck,image';

    let result = new Array<GameIndex>();
    let offset = 0;
    let finished: boolean = false;
    while (!finished) {
      let response = await this.execute(gamesOptions);
      let pageSize = response.number_of_page_results;
      let totalSize = response.number_of_total_results;
      result.push(...response.results);
      offset += pageSize;
      if (offset >= totalSize) {
        finished = true;
      }
      gamesOptions.qs.offset = offset;
    }
    return result;

  }


  private async execute(options: HttpOptions): Promise<any> {
    //request.debug(true);
    //this.handleFilter(options, filter);
    console.log('Options:', options);
    try {
      let result = await request.json<any>(options.url, options);
      if (result.error !== 'OK') {
        new Error(result.error);
      }
      return result;
    } catch (e) {
      throw e;
    }
  }

  private handleFilter(options: HttpOptions, filter: Map<string, string> = null): void {
    if (filter !== null) {
      let filterString = '';
      let firstFilter = true;
      for (let property in filter) {
        if (firstFilter) {
          firstFilter = false;
        } else {
          filterString += '|';
        }
        filterString += property + ':' + filter[property];
      }
      options.qs.filter = filterString;
    }
  }

}


export class Platform {

  public static readonly  PSP: Platform = new Platform(18, "PlayStation Portable", "PSP");
  public static readonly  PSVITA: Platform = new Platform(129, "PlayStation 3", "PSVITA");
  public static readonly  PS: Platform = new Platform(22, "PlayStation", "PS");
  public static readonly  PS2: Platform = new Platform(19, "PlayStation 2", "PS2");
  public static readonly  PS3: Platform = new Platform(35, "PlayStation 3", "PS3");
  public static readonly  PS4: Platform = new Platform(146, "Playstation 4", "PS4");
  public static readonly  PSNPSP: Platform = new Platform(116, "PlayStation Network (PSP)", "PSNPSP");
  public static readonly  PSNPSV: Platform = new Platform(143, "PlayStation Network (PSVITA)", "PSNPSVITA");
  public static readonly  PSNPS3: Platform = new Platform(88, "PlayStation Network (Playstation 3)", "PSNPS3");
  public static readonly  XBOX: Platform = new Platform(32, "Microsoft XBOX", "XBOX");
  public static readonly  XBOX360: Platform = new Platform(20, "Microsoft XBOX 360", "XBOX360");
  public static readonly  XBOXONE: Platform = new Platform(145, "Microsoft XBOX One", "XONE");
  public static readonly  VIRTUALBOY: Platform = new Platform(79, "Virtual Boy", "VBoy");

  public readonly id: number;
  public readonly name: string;
  public readonly short: string;

  private constructor(id: number, name: string, short: string) {
    this.id = id;
    this.name = name;
    this.short = short;
  }
}

export class GameIndex {

  constructor(public id: number, public name: string, public deck: string, public images: any){
  }

}


//util, get the response check for transport errors, and logical errors (from giantbomb in JSON), if an error occured the promise will be rejected, in case of success the JSON object is returned

export default Giantbomb;
