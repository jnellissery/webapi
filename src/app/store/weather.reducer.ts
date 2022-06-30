import { createReducer, on } from '@ngrx/store';
import { CityConditions } from '../shared/models/city-conditions';

import {
  getcityconditionsSuccessMsg,
  getcityconditionsErrorMsg,
  getcityconditionsaction
  
} from './weather.action';

export interface weatherState {
  allUsers: CityConditions;
  selecteduser: CityConditions;
}
export const initialState: weatherState = {
    allUsers:{id:0,name:'',temp:0,windSpeed:0},
    selecteduser: {id:0,name:'',temp:0,windSpeed:0}
};

export const weatherReducer = createReducer(
  initialState,
  on(getcityconditionsaction, (state, { id:number }) => {
    return {
      ...state
    };
  }),
  on(getcityconditionsSuccessMsg, (state, { CityConditions }) => {
    return {
      ...state,
      allUsers: CityConditions,
    };
  }),
   on(getcityconditionsErrorMsg, (state, { error }) => {
    return {
      ...state,
      error,
    };
  }),

);
