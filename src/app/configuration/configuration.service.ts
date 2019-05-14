import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

import { Merchant } from './merchant';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {

  configurations: object = null;
  private merchant:Merchant = null;

  constructor(private httpClient: HttpClient) {}

  getConfigs() {
    // this is where you would run a http service to fetch the congfiguratations
    // convert the response into a promise
    console.log('loading initial configurations');

    console.log('loading Merchant');

    this.loadMerchant();

  }

  loadMerchant() {
    this.httpClient.get(environment.baseUrl + '/api/v1/store/DEFAULT')
      .subscribe((data:Merchant) => {
      console.log(data);
      this.merchant = data;
    }, error => console.log('Could not load merchant'));
  }

  getMerchant() {
    return this.merchant;
  }
}

const serverConfigs: Object = {
  APIEndpoint: 'url_here',
  token: 'abcdee'
};

//TODO where do we store variables / configuration
const merchantConfigs: Object = {
  APIEndpoint: environment.baseUrl + 'http://localhost:8080/api/v1/store/DEFAULT',
  token: 'NONE'
};
