class HttpOptions {

  public headers: any = {
    'User-Agent': 'giantbomb-node-typescript; node search client by Christian Katzorke'
  };

  public throwResponseError: boolean = true;

  constructor(public url: string, public qs: any, public method = "GET") {
  }

  public clone() {
    let qsCopy = Object.assign({}, this.qs);//{ ...this.qs }; //<- not working yet? ts 2.1, es2017
    return new HttpOptions(this.url, qsCopy, this.method);
  }
}

export default HttpOptions;
