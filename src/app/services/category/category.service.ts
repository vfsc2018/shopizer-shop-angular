import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import {map, publishReplay, refCount } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Category } from './model/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private httpClient: HttpClient) { }

  getRootMenu() : Observable<Category[]> {
    let apiURL = environment.baseUrl + '/api/v1/category/?store=' + environment.merchant;
      console.log('loading merchant');
      //return this.httpClient.get(apiURL).pipe(
      //  map((data:Category[]]) => {return data as Category[]})
      //);
      return null;
    }


}
