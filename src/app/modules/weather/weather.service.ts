/** Angular Imports */
import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';

/** Third-Party Imports */
import { forkJoin, Observable, zip } from "rxjs";

/** Local Imports */
import { CurrentConditions } from "../../shared/models/weather";
import { map } from "rxjs/operators";
import { City } from "../../shared/models/city";
import { CityConditions } from "../../shared/models/city-conditions";
import { CurrentforecastConditions } from "src/app/shared/models/forecast";
import { forCastConditions } from "src/app/shared/forecast-conditions";

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private _http: HttpClient) { }

  /**
   * Make an HTTP call to the API for the current weather conditions in the city with the provided ID
   *
    @param id
   */
  getCityConditions$(id: number): Observable<CityConditions> {
    return forkJoin([
        this._http.get<City>(`api/cities/${id}`),
        this._http.get<CurrentConditions>(`api/currentConditions/${id}`)
      ]).pipe(
      map(([city, currentConditions]) => {
        return { ...city, ...currentConditions }
      })
    );
  }
  getcurrenconditionbysecond(id: number){
    return this._http.get<CurrentConditions>(`api/currentConditions/${id}`)
  }
  getforeCastConditions$(id: number): Observable<forCastConditions> {
    return forkJoin([
        this._http.get<City>(`api/cities/${id}`),
        this._http.get<CurrentforecastConditions>(`api/forecasts/${id}`)
      ]) .pipe(
      map(([city, CurrentforecastConditions]) => {
        return { ...city,  ...CurrentforecastConditions }
      })
    );
  }

}
