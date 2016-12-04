class HttpOptions {

  public headers: any =  {
			  'User-Agent': 'giantbomb-node-typescript; node search client by Christian Katzorke'
	};

  public throwResponseError:boolean = true;

  constructor(public url: string, public qs: any, public method = "GET"){
  }

  public clone(){
    return new HttpOptions(this.url, this.qs, this.method);
  }
}

export default HttpOptions;
