class HttpOptions {

  public headers: any =  {
			  'User-Agent': 'giantbomb-node-typescript; node search client by Christian Katzorke'
	};

  public throwResponseError:boolean = true;

  constructor(public url: string, public qs: any, public method = "GET"){
  }

  public clone(){
    let qsCopy = this.copyObject(this.qs);
    return new HttpOptions(this.url, qsCopy, this.method);
  }

  private copyObject<T> (object:T): T {
    var objectCopy = <T>{};

    for (var key in object){
        if (object.hasOwnProperty(key)){
            objectCopy[key] = object[key];
        }
    }

    return objectCopy;
  }
}

export default HttpOptions;
