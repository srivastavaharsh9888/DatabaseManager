import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../environments/environment';
import { Observable } from 'rxjs/internal/Observable';

@Injectable()
export class MergeService {
    constructor(
        public htttp: HttpClient
    ) { }

    mergeData(data):Observable<any>{
        return this.htttp.post(`${environment.serviceBaseURL}/mergeData/`, data);    
    }
}
