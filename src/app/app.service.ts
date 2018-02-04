import {RequestOptionsArgs, Http, Headers} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Injectable } from '@angular/core';

@Injectable()
export class AppService {

  constructor( private http: Http) { }

  private url = 'https://lilcortexbucket.blob.core.windows.net/public/meters.json';  // URL to REST api
  
  public getData (): Promise<any> {
    return this.http.get ( this.url )
    .toPromise()
    .then ( response => response.json())
    .catch ( this.handelError );
  }

  private handelError ( error: any ) : Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}