import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType} from '@ngrx/effects'
import { createAction } from '@ngrx/store';
import * as fromActions from './weather.action';
import { map, switchMap, mergeMap, catchError, debounceTime } from 'rxjs/operators';
import { WeatherService } from '../modules/weather/weather.service';

@Injectable()
export class weatherEffectsService {
constructor(private actions$ : Actions, private svc: WeatherService) { }
getAllweather$=createEffect(
()=>this.actions$.pipe(
    ofType(fromActions.getcityconditionsaction),
    switchMap((action)=>this.svc.getCityConditions$(action.id).pipe(
      map(data=>
        {
            return fromActions.getcityconditionsSuccessMsg({CityConditions:data})}
        )
    ))
))
}