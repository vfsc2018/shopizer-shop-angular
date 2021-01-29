import { Injectable } from '@angular/core';
// import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

import { map, catchError } from "rxjs/operators";
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/catch';
// import 'rxjs/add/operator/toPromise';
import { environment } from '../../environments/environment';

@Injectable()
export class AppService {
    url = '';
    constructor(private http: HttpClient) { 
        this.url = environment.baseUrl + environment.apiVersion;
    }
    // constructor(private http: Http) { 
    //     this.url = environment.baseUrl + environment.apiVersion;
    // }
    // post(action, body, headers){
    //     return this.http.post<any>(action, body, { headers }).pipe(map(this.))
    //     });
    // }
    

    postMethod(action, requestJSON) {
        let headers = this.authorizationHeader();
        return this.http.post(this.url + action, requestJSON, {
            headers
        }).pipe(
            map(this.extractData),
            catchError(this.handleErrorObservable)
        );
    }
    // createAuthorizationHeader(headers: HttpHeaders) {
    //     let userData = JSON.parse(localStorage.getItem('userData'))
    //     if (userData) {
    //         headers.append('Authorization', 'Bearer ' + userData.token);
    //     }
    //     headers.append('Content-Type', 'application/json');
    // }
    authorizationHeader() {
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        let userData = JSON.parse(localStorage.getItem('userData')); 
        
        if (userData) { 
            headers = headers.set('Authorization', 'Bearer ' + userData.token);
        }
        
        return headers;
    }
    getMethod(action) {
        let headers = this.authorizationHeader();
        return this.http.get(this.url + action, {
            headers
        })
            .pipe(
                map(this.extractData),
                catchError(this.handleErrorObservable)
            );
    }
    put(action, id, requestJSON) {
        return this.http.put(this.url + action + id, requestJSON)
            .pipe(
                map(this.extractData)
                // ,
                // catchError(this.handleErrorObservable)
            );
    }
    putMethod(action, requestJSON) {
        let headers = this.authorizationHeader();
        return this.http.put(this.url + action, requestJSON, {
            headers: headers
        });
    }
    patch(action) {
        let headers = this.authorizationHeader();
        return this.http.patch(this.url + action, {
            headers: headers
        })
            .pipe(
                map(this.extractData),
                catchError(this.handleErrorObservable)
            );
    }
    patchMethod(action, requestJSON) {
        let headers = this.authorizationHeader();
        return this.http.patch(this.url + action, requestJSON, {
            headers: headers
        })
            .pipe(
                map(this.extractData),
                catchError(this.handleErrorObservable)
            );
    }
    deleteMethod(action, requestJSON) {
        return this.http.delete(this.url + action + requestJSON)
            .pipe(
                map(this.extractData),
                catchError(this.handleErrorObservable)
            );
    }

    private extractData(res: any) {
        return res;
        // let body = res.json();
        // return body
    }
    private handleErrorObservable(error: any) {
        return throwError(error.message || error);
        // return Observable.throw(error.message || error);
    }
    private handleErrorPromise(error: any) {
        console.error(error);
        return Promise.reject(error.message || error);
    }
} 