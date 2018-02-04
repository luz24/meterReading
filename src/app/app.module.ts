import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { ChartModule } from 'angular2-highcharts';
import { AgmCoreModule } from '@agm/core';
import { HighchartsStatic } from 'angular2-highcharts/dist/HighchartsService';

import { TypePipe } from './app.type-pipe'
import { AppService } from './app.service';

declare var require: any;
export function highchartsFactory() {
  const Highcharts = require('highcharts');
  Highcharts.setOptions({  global : { useUTC : false } });
  return Highcharts;
}

@NgModule({
  declarations: [
    AppComponent,
    TypePipe
  ],
  imports: [
    BrowserModule,
    HttpModule,
    CommonModule,
    FormsModule,
    AgmCoreModule.forRoot({}),
    ChartModule
  ],
  providers: [ 
    {
      provide: HighchartsStatic,
      useFactory: highchartsFactory
    },
    AppService 
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
