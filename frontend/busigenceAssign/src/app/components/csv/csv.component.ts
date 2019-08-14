import { Component, OnInit } from '@angular/core';
import {SharedServiceService} from './../../services/shared-service.service';
import { Papa } from 'ngx-papaparse';

@Component({
  selector: 'app-csv',
  templateUrl: './csv.component.html',
  styleUrls: ['./csv.component.css']
})
export class CsvComponent implements OnInit {
  
  csvFile:any;
  csvData:any;
  colNames:any;

  constructor(private sharedService:SharedServiceService,private papa:Papa) { }

  selectOtherCol(csvColName){
    this.csvData["csvColName"]=csvColName;
    this.sharedService.setOtherName(this.csvData);
  }

  ngOnInit() {
    this.sharedService.getCSVFile().subscribe(data => { 
      if(!(data==null || data==undefined))
      {
        this.csvData={};
        this.csvData["file"]=data
        this.papa.parse(data, {
        complete: result =>{
          this.csvData["data"]=result.data;
          this.colNames=result.data[0];
        }
      });
      }
    });
  }

}
