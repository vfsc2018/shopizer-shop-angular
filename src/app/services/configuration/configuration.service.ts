import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import {map, publishReplay, refCount } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

import { Merchant } from './merchant';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {

  //configurations: object = null; //TODO
  private merchant : Observable<Merchant> = null;

  constructor(private httpClient: HttpClient) {}

  loadConfigurations() {
    //console.log('load configs');
  }

  /** cached Merchant */
  getMerchant() : Observable<Merchant> {
    let apiURL = environment.baseUrl + '/api/v1/store/' + environment.merchant;
    if (!this.merchant) {
      console.log('loading merchant');
      this.merchant = this.httpClient.get(apiURL).pipe(
          map((data:Merchant) => {return data as Merchant}),
          publishReplay(1), // this tells Rx to cache the latest emitted
          refCount() // and this tells Rx to keep the Observable alive as long as there are any Subscribers
      );
    }

    
    //this.merchant = this.httpClient.get(apiURL).pipe(
    //map((data: Merchant)  => {
    //  return data as Merchant
    //})
    //)

    return this.merchant;

  }

}
