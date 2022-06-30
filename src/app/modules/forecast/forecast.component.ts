import { Component, Input, OnInit } from '@angular/core';
import { cloneDeep } from 'lodash-es';
import { Observable } from 'rxjs';
import { forCastConditions } from 'src/app/shared/forecast-conditions';
import { CurrentforecastConditions } from 'src/app/shared/models/forecast';
import { WeatherService } from '../weather/weather.service';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.scss']
})
export class ForecastComponent implements OnInit {
  @Input() public forcastConditions$: Observable<forCastConditions> | null = null;
  forcastConditions!:forCastConditions;
  forecast$!:Observable<forCastConditions>
  constructor(private svc : WeatherService) { }

  ngOnInit(): void {
    this.forcastConditions$?.subscribe(x=>{
     x.forecast.forEach((x: { day: string,temp:string })=>{return x.temp=x.temp+" C";});
    this.forcastConditions=x;
  })}

}
