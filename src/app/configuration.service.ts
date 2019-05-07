import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {

  configurations: object = null;

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
}

const serverConfigs: Object = {
  APIEndpoint: 'url_here',
  apiKey: 'abcdee'
};
