import HttpOptions from './httpoptions';
import {QueryStringBuilder} from './querystring';
import * as request from 'web-request';

class Giantbomb {

  private httpDefaultOptions:HttpOptions; 

  constructor(private apikey: string){
    let qs = new QueryStringBuilder().addQueryStringParameter('api_key', this.apikey)
                            .addQueryStringParameter('limit', 100)
                            .addQueryStringParameter('offset', 0)
                            .addQueryStringParameter('sort', '')
                            .addQueryStringParameter('field_list','id,name,description,aliases,deck,image,images,original_release_date,developers,genres,publishers,platforms,site_detail_url,date_last_updated')
                            .addQueryStringParameter('format', 'json').build();
    this.httpDefaultOptions = new HttpOptions('http://www.giantbomb.com/api', qs);
  }


  public async quickSearch(searchString: string, filter:any = null): Promise<any>{
        let searchOptions = this.httpDefaultOptions.clone();
        searchOptions.url += '/search';
        searchOptions.qs.query = searchString;
        searchOptions.qs.resources = 'game';
        searchOptions.qs.field_list = 'id,name,deck,image,platforms';
        return await this.execute(searchOptions, filter);
  }

  public async details(id: string): Promise<any>{
        let detailsOptions = this.httpDefaultOptions.clone();
        detailsOptions.url += `/game/3030-${id}`;
        detailsOptions.qs.field_list = '';
        let result = await this.execute(detailsOptions);
        //if found, extract results directly
        if(result.number_of_total_results === 0){
          result = null;
        } else {
          result = result.results;
        }
        return result;
  }

  private async execute(options: HttpOptions, filter:any = null): Promise<any>{
    request.debug(true);
    this.handleFilter(options, filter);
    console.log('Options:', options);
    try{
      let result = await request.json<any>(options.url, options);
      if(result.error !== 'OK'){
        new Error(result.error);
      }
      return result;
    }catch(e){
      throw e;
    }
  }

  private handleFilter(options: HttpOptions, filter:any = null): void {
    if(filter !== null){
      let filterString = '';
      let firstFilter = true;
      for (let property in filter) {
          if (filter.hasOwnProperty(property)) {
              if (firstFilter) {
                  firstFilter = false;
              } else {
                  filterString += '|';
              }
              filterString += property + ':' + filter[property];
          }
      }
      options.qs.filter = filterString;
    }
  }

}


//util, get the response check for transport errors, and logical errors (from giantbomb in JSON), if an error occured the promise will be rejected, in case of success the JSON object is returned

export default Giantbomb;
