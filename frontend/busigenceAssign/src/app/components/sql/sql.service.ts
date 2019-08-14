import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../environments/environment';
import { Observable } from 'rxjs/internal/Observable';

@Injectable()
export class DatabaseService {
    constructor(
        public htttp: HttpClient
    ) { }

    getDatabase(data):Observable<any>{
        return this.htttp.post(`${environment.serviceBaseURL}/showDatabase/`, data);    
    }

    getTableList(data):Observable<any>{
        return this.htttp.post(`${environment.serviceBaseURL}/tableDetail/`, data);        	
    }
}
