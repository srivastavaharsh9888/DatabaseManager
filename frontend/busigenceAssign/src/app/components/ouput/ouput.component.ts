import { Component, OnInit } from '@angular/core';
import {SharedServiceService} from './../../services/shared-service.service';
import Swal from 'sweetalert2';
import {MergeService} from './output.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-ouput',
  templateUrl: './ouput.component.html',
  styleUrls: ['./ouput.component.css']
})
export class OuputComponent implements OnInit {

  credential:any;
  csvData:any;
  firstCol:any;
  secondCol:any;
  firData:any;
  secData:any;
  trans:any;
  join:any;

  constructor(private sharedService:SharedServiceService,private merge:MergeService,private router: Router) { 
    this.firstCol=null;
    this.secondCol=null;
    this.trans="0";
    this.join="inner";
  }

  setDataSQL()
  {
    if(this.firstCol==null)
    {
      this.firstCol=this.credential.colName+"("+this.credential.dbName+")";
      this.firData=this.credential;
    }
    else if(this.secondCol==null)
    {
      this.secondCol=this.credential.colName+"("+this.credential.dbName+")";
      this.secData=this.credential;
    }
    else if(this.secondCol!=null && this.firstCol!=null)
    {
      this.firstCol=this.credential.colName+"("+this.credential.dbName+")";
      this.firData=this.credential;
    }
    Swal.fire({
        position: 'top-end',
        type: 'success',
        title: 'Changed.',
        showConfirmButton: false,
        timer: 1000
      })  
  }

  setDataCSV()
  {
    if(this.firstCol==null)
    {
      this.firstCol=this.csvData.csvColName+"("+this.csvData.file.name +")";
      this.firData=this.csvData;
    }
    else if(this.secondCol==null)
    {
      this.secondCol=this.csvData.csvColName+"("+this.csvData.file.name +")";
      this.secData=this.csvData;
    }
    else if(this.secondCol!=null && this.firstCol!=null)
    {
      this.firstCol=this.csvData.csvColName+"("+this.csvData.file.name +")";
      this.firData=this.csvData;
    }
  }


  sendData(){
    var finalData={}
    finalData["trans"]=this.trans;
    finalData["join"]=this.join;
    finalData["first"]=this.firData;
    finalData["second"]=this.secData;
    this.merge.mergeData(finalData).subscribe((res) => {
      Swal.fire("Sucessfully Saved",res.message); 
      window.localStorage.setItem("filename",res.name)
      window.localStorage.setItem("data",JSON.stringify(res.file))
      window.localStorage.setItem("colheader",JSON.stringify(res.colheader))
      this.router.navigateByUrl('/preview');
    }, err => {
       Swal.fire("Invalid Credential",err.error.message); 
    })

    this.merge.mergeData(finalData);
  }

  ngOnInit() {
  this.sharedService.getSelectedCol().subscribe(data => { 
      if(!(data==null || data==undefined))
      {
        this.credential=data;
        this.setDataSQL();
      }
    });

  this.sharedService.getOtherCol().subscribe(data => { 
      if(!(data==null || data==undefined))
      {
        this.csvData=data;
        this.setDataCSV();
      }
    });
  }

}
