import { Component, OnInit } from '@angular/core';
import { mySQLCredential } from './home.entity';
import {NgForm} from '@angular/forms';
import { SharedServiceService } from './../../services/shared-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  selected:Number;
  sqlCredential:mySQLCredential;

  constructor(private sharedServie:SharedServiceService) { 
  	this.selected=1;
  	this.sqlCredential=new mySQLCredential();
  }

  ngOnInit() {
  }

  fileChanged(e) {
    this.sqlCredential.csvFile = e.target.files[0];
  }

  setData(form){
    if(this.selected==1){
    	this.sharedServie.sendCredential(form.value);
    }
    else{
      this.sharedServie.sendCSVFile(this.sqlCredential.csvFile)
    }
  } 
}
