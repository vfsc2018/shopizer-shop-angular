import { Injectable } from '@angular/core';
import { Observable, Subject, throwError } from 'rxjs';
import { map, publishReplay, refCount, catchError  } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Content } from '../../model/content/content';

@Injectable({
  providedIn: 'root'
})
export class ContentService {

  constructor(private httpClient: HttpClient) { }

  getContentMenu() : Observable<Content[]> {
    let apiURL = environment.baseUrl + '/api/v1/content/pages/?store=' + environment.merchant;
   return this.httpClient.get(apiURL)
     .pipe(
       map((data:Content[]) => {return data as Content[]}),
       catchError(err => {
         //find a generic error management page
         console.error(err.message);
         console.log("Error is handled");
         return throwError("Error thrown from catchError");
       })
   )

  }

}
