import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class DataSharingService {
    public category: BehaviorSubject<string> = new BehaviorSubject<string>('');
    public count: BehaviorSubject<number> = new BehaviorSubject<number>(0);
    public modelRef: BehaviorSubject<any> = new BehaviorSubject<any>('');
    public categoryData: BehaviorSubject<any> = new BehaviorSubject<any>('');
    public isLogin: BehaviorSubject<any> = new BehaviorSubject<any>('');
}