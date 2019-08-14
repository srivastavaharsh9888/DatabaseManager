import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedServiceService {
  
  private messageSource = new BehaviorSubject(null);
  private colName = new BehaviorSubject(null);
  private csvData = new BehaviorSubject(null);
  private otherCol = new BehaviorSubject(null);

  
  constructor() { }

  sendSelectedCol(data:any){
    this.colName.next(data);
  }

  sendCredential(data: any) {
    this.messageSource.next(data)
  }
 
  sendCSVFile(data:any){
    this.csvData.next(data);
  }

  setOtherName(data:any){
    this.otherCol.next(data);
  }

  getSelectedCol(){
    return this.colName.asObservable();
  }

 getCredential(){  
    return this.messageSource.asObservable();  
  } 

  getCSVFile(){
    return this.csvData.asObservable();  
  }

  getOtherCol(){
    return this.otherCol.asObservable();
  }

}

