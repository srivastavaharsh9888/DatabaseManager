import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.css']
})
export class PreviewComponent implements OnInit {

  filename:any;
  data:any;
  columnNames:any;

  constructor() { }

  ngOnInit() {
  	this.filename=window.localStorage.getItem("filename");
  	this.data=JSON.parse(window.localStorage.getItem("data"));
  	this.columnNames=JSON.parse(window.localStorage.getItem("colheader"));;
  }

}
