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


  public async quickSearch(searchString: string): Promise<any>{
        let searchOptions = this.httpDefaultOptions.clone();
        searchOptions.url += '/search';
        searchOptions.qs.query = searchString;
        searchOptions.qs.resources = 'game';
        searchOptions.qs.field_list = 'id,name,deck,image,platforms';
        return await this.execute(searchOptions);
        
  }

  private async execute(options: HttpOptions): Promise<any>{
    //request.debug(true);
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

}


//util, get the response check for transport errors, and logical errors (from giantbomb in JSON), if an error occured the promise will be rejected, in case of success the JSON object is returned

export default Giantbomb;
