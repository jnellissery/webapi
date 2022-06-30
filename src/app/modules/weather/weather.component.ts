/** Angular Imports */
import { ActivatedRoute, ParamMap } from "@angular/router";
import { Component, OnInit } from '@angular/core';

/** Third-Party Imports */
import {  Observable, timer } from "rxjs";
import { filter, map, switchMap } from "rxjs/operators";

/** Local Imports */
import { CityConditions } from "../../shared/models/city-conditions";
import { WeatherService } from "./weather.service";
import {  weatherState } from "src/app/store/weather.reducer";
import { Store } from "@ngrx/store";
import { weatherSelector } from "src/app/store/weather.select";
import { getcityconditionsaction } from "src/app/store/weather.action";
import { forCastConditions } from "src/app/shared/forecast-conditions";
const source = timer(0, 1000);
@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})

export class WeatherComponent implements OnInit {
  
 
  /**
   * Observable of the currently selected city's weather conditions
   */
  public cityConditions$: Observable<CityConditions> | null = null;
  public forcastConditions$: Observable<forCastConditions> | null = null;
   id:number=0;
  constructor(
    public route: ActivatedRoute,
    public weatherService: WeatherService,
    private store$: Store<weatherState>
  ) { 

    this.cityConditions$=this.store$.select(weatherSelector) ;
  }

  ngOnInit(): void {
    
    // Obtain city and current conditions data from the id provided in the route parameters
    //source.subscribe(x=>
    //this.store$.dispatch(({ users: x }));
    this.route.paramMap.subscribe(x=>{
      this.store$.dispatch(getcityconditionsaction({id:parseInt(x.get('id')!!) }))
    })
   /* i implement NGRX select and effect only here we can use in forecast but data is not etting change frequently*/
    // this.cityConditions$ = this.route.paramMap.pipe(
      
    //   // Only continue if an id was passed
      
     
    //   filter((paramMap: ParamMap) => !!paramMap.get('id')),

    //   // Get cityCondition data from the weather service
    //   switchMap((paramMap: ParamMap) => {
    //      // this.store$.dispatch(getcityconditionsaction({id:parseInt(paramMap.get('id')!!) }))
    //       return this.weatherService.getCityConditions$(parseInt(paramMap.get('id') as string));
    //   })
    // )
    

    this.forcastConditions$ = this.route.paramMap.pipe(
      
      // Only continue if an id was passed
      filter((paramMap: ParamMap) => !!paramMap.get('id')),

      // Get cityCondition data from the weather service
      switchMap((paramMap: ParamMap) => {
        
          return  this.weatherService.getforeCastConditions$(parseInt(paramMap.get('id') as string));
         
           
      })
    ) 
  }
}
