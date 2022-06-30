/** Angular Imports */
import { Component, Input, OnInit } from '@angular/core';

/** Third-Party Imports */
import { interval, Observable } from "rxjs";

/** Local Imports */
import { CityConditions } from "../../../shared/models/city-conditions";
import { WeatherService } from '../weather.service';

/** Third-Party Imports  for store imutable  data  to mutable*/
import { cloneDeep } from 'lodash-es';

@Component({
  selector: 'app-current-conditions',
  templateUrl: './current-conditions.component.html',
  styleUrls: ['./current-conditions.component.scss']
})
export class CurrentConditionsComponent implements OnInit {

  @Input() public cityConditions$: Observable<CityConditions> | null = null;
  cityConditions:CityConditions={id:0,name:'',temp:0,windSpeed:0};
id! :number;
  constructor(private svc :WeatherService) { }

  ngOnInit(): void {
    this.cityConditions$?.subscribe(
      x=>this.cityConditions=cloneDeep(x));
      window.setInterval(()=>{
        this.svc.getcurrenconditionbysecond(this.cityConditions.id).subscribe(x=>
          {
            this.cityConditions.temp=x.temp;
            this.cityConditions.windSpeed=x.windSpeed;
          }
        )
    }, 1000);
  
}
}
