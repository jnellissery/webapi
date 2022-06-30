/** Angular Imports */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

/** Local Imports */
import { CurrentConditionsComponent } from "./current-conditions/current-conditions.component";
import { WeatherComponent} from "./weather.component";
import { ForecastComponent } from '../forecast/forecast.component';
import { MaterialExampleModule } from 'src/app/material.module';
 

@NgModule({
  declarations: [
    WeatherComponent,
    CurrentConditionsComponent,ForecastComponent
  ],
  imports: [
    CommonModule,MaterialExampleModule
  ]
})
export class WeatherModule { }
