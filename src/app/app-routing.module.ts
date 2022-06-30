/** Angular Imports */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

/** Local Imports */
import { WeatherComponent } from "./modules/weather/weather.component";

const routes: Routes = [
  { path: ':id', component: WeatherComponent },
  { path: '', redirectTo:'1', pathMatch:'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
