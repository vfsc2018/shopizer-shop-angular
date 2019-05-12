import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
//import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {

  configurations: object = null;
  merchant: object = null;

  constructor(private http: HttpClient) {}

  getConfigs(): Promise<Object> {
    // this is where you would run a http service to fetch the congfiguratations
    // convert the response into a promise
    console.log('loading initial configurations');


    return of(serverConfigs) // this could be a http request
      .pipe(
        tap(config => {
          this.configurations = config;
        })
      )
      .toPromise();
  }


  getMerchant(): Promise<Object> {
    // this is where you would run a http service to fetch the merchant
    // convert the response into a promise
    console.log('loading Merchant');


    return of(merchantConfigs) // this could be a http request
      .pipe(
        tap(merchant => {
          this.merchant = merchant;
        })
      )
      .toPromise();
  }
}

const serverConfigs: Object = {
  APIEndpoint: 'url_here',
  token: 'abcdee'
};

//TODO where do we store variables / configuration
const merchantConfigs: Object = {
  APIEndpoint: 'http://localhost:8080/api/v1/store/DEFAULT',
  token: 'NONE'
};
