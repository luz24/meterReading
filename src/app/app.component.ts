import { Component, OnInit } from '@angular/core';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
 
  public tData: any;
  zoom: number = 10;
  options: object;
  infoWindowOpened = null;
 
  constructor(private appService: AppService ) {}

  getMeterValues() {
    this.appService.getData()
      .then( results => this.tData = results )
      .catch ( err => console.error ( "error", err ) );
  }

  closeWindow(infoWindow) {
    if( this.infoWindowOpened === infoWindow)
      return;
    
    if(this.infoWindowOpened !== null)
      this.infoWindowOpened.close();
      
    this.infoWindowOpened = infoWindow;
  }

  clickedMarker(key: string, threshold: string, points: any) {
    var pointArray = [];
    var eachArray = [];
    
    for (var i in points) {
      eachArray.push(new Date(points[i].timestamp).getTime(), Number(points[i].demand_value));
      pointArray.push(eachArray);
      eachArray= [];
    }

    // console.log(pointArray);

    this.options = {
      rangeSelector : {
        enabled : false
      },
      title: { 
        text: '#Meter ' + key + ' - DEMAND'  
      },
      yAxis: { 
        title: { 
          text: 'Reading Values' 
        },
        plotLines: [{
          value     : Number(threshold),
          color     : 'red',
          dashStyle : 'shortdash',
          width     : 2,
          label     : {
              text: 'Max Threshold'
          }
        }] 
      },
      xAxis: { 
        title: { 
          text : 'Timestamp' 
        },
        type: 'datetime',
        dateTimeLabelFormats : {
          minute: '%H:%M',
          hour: '%H:%M',
          year: '%Y'
        }
      },
      series: [
         {
          name          : 'meter value',
          data          : pointArray,
          threshold     : Number(threshold),
          color         : 'red',
          negativeColor : 'blue',
          tooltip       : {
              valueDecimals: 2
          }
        }
      ]
    };
  }

  ngOnInit() {
    this.getMeterValues();
  }

}
