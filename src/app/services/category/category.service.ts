import { Injectable } from '@angular/core';
import { Observable, Subject, throwError } from 'rxjs';
import { map, publishReplay, refCount, catchError  } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Category } from './model/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private httpClient: HttpClient) { }

  getCategoryHierarchy() : Observable<Category[]> {
      let apiURL = environment.baseUrl + '/api/v1/category/?store=' + environment.merchant + '&filter=[visible]';
       console.log('loading category hierarchy');
      return this.httpClient.get(apiURL)
        .pipe(
          map((data:Category[]) => {return data as Category[]}),
          catchError(err => {
            //find a geberic error management page
            console.error(err.message);
            console.log("Error is handled");
            return throwError("Error thrown from catchError");
          })
      )
  }

  handleError() {

  }


}
