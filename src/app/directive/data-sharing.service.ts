import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class DataSharingService {
    public count: BehaviorSubject<number> = new BehaviorSubject<number>(0);
}