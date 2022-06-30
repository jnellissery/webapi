export interface CurrentforecastConditions {
   id:number,
   forecast:forecasts[]
  }
  interface forecasts{
    day:string,
    temp:string
  }