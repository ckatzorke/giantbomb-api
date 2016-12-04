
export class QueryStringBuilder {
  
  private qs = new Map<string, any>();
  

  public addQueryStringParameter(key: string, value: any): QueryStringBuilder {
    this.qs.set(key, value);
    return this;
  }

  public build(): any{
    let query = {};
    this.qs.forEach((value: any, key: string) => {
      query[key] = this.qs.get(key);
    });
    return query;
  }
}


export default QueryStringBuilder;
