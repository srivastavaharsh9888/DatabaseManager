import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { SqlComponent } from './components/sql/sql.component';
import { CsvComponent } from './components/csv/csv.component';
import { FormsModule } from '@angular/forms';
import { DatabaseService } from './components/sql/sql.service';
import { MergeService } from './components/ouput/output.service';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { OuputComponent } from './components/ouput/ouput.component';
import { PapaParseModule } from 'ngx-papaparse';
import { PreviewComponent } from './components/preview/preview.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SqlComponent,
    CsvComponent,
    OuputComponent,
    PreviewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    PapaParseModule
  ],
  providers: [DatabaseService,MergeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
