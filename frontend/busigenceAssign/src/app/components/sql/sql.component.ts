import { Component, OnInit } from '@angular/core';
import {SharedServiceService} from './../../services/shared-service.service';
import {DatabaseService} from './sql.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sql',
  templateUrl: './sql.component.html',
  styleUrls: ['./sql.component.css']
})
export class SqlComponent implements OnInit {

  showList:Array<any>;
  credential:any;
  columnLoad:Boolean;
  colList:any;

  constructor(private sharedService:SharedServiceService,private dbService:DatabaseService) { 
    this.showList=[];
    this.columnLoad=true;
    this.colList=[];
  }

  openDetail(dbName,tableName){
    this.credential["dbName"]=dbName;
    this.credential["tableName"]=tableName;
    this.dbService.getTableList(this.credential).subscribe((res) => {
      this.colList=res;
      this.columnLoad=false;
    });
  }

  getDatabase(data) {
    this.dbService.getDatabase(data).subscribe((res) => {
      Swal.fire({
        position: 'top-end',
        type: 'success',
        title: 'You are successfully connected to your database.',
        showConfirmButton: false,
        timer: 1500
      })
      var co=0;
      var showObj={}
      var dataList=res.message
      for(var i in dataList){
        if(!(dataList[i][0] in showObj))
        {
          showObj[dataList[i][0]]=co
          this.showList.push({"name":dataList[i][0],"tableList":[]})
          co=co+1;
        }
        this.showList[showObj[dataList[i][0]]].tableList.push(dataList[i][1])
      }
    }, err => {
       Swal.fire("Invalid Credential",err.error.message); 
    })
  }

  selectCol(colName){
    this.credential["colName"]=colName;
    this.sharedService.sendSelectedCol(this.credential);
  }

  ngOnInit() {
    this.sharedService.getCredential().subscribe(data => { 
      if(!(data==null || data==undefined))
      {
        this.credential=data;
        this.showList=[];
        this.getDatabase(this.credential);
      }
    });  
  }
}
