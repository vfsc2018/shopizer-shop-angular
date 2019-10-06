import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';


import { map, catchError } from "rxjs/operators";
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/catch';
// import 'rxjs/add/operator/toPromise';
import { environment } from '../../environments/environment';

@Injectable()
export class AppService {
    url = '';
    constructor(private http: Http) { 
        this.url = environment.baseUrl + environment.apiVersion;
    }
    postMethod(action, requestJSON) {
        let headers = new Headers();
        this.createAuthorizationHeader(headers);
        return this.http.post(this.url + action, requestJSON, {
            headers: headers
        }).pipe(
            map(this.extractData),
            catchError(this.handleErrorObservable)
        );
    }
    createAuthorizationHeader(headers: Headers) {
        let userData = JSON.parse(localStorage.getItem('userData'))
        if (userData) {
            headers.append('Authorization', 'Bearer ' + userData.token);
        }
        headers.append('Content-Type', 'application/json');
    }
    getMethod(action) {
        let headers = new Headers();
        this.createAuthorizationHeader(headers);
        return this.http.get(this.url + action, {
            headers: headers
        })
            .pipe(
                map(this.extractData),
                catchError(this.handleErrorObservable)
            );
    }
    putMethod(action, id, requestJSON) {
        return this.http.put(this.url + action + id, requestJSON)
            .pipe(
                map(this.extractData),
                catchError(this.handleErrorObservable)
            );
    }
    patchMethod(action, requestJSON) {
        let headers = new Headers();
        this.createAuthorizationHeader(headers);
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

    private extractData(res: Response) {
        let body = res.json();
        return body
    }
    private handleErrorObservable(error: Response | any) {

        return Observable.throw(error.message || error);
    }
    private handleErrorPromise(error: Response | any) {
        console.error(error);
        return Promise.reject(error.message || error);
    }
} 