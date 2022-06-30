import { createFeatureSelector, createSelector } from '@ngrx/store';
import { weatherState } from './weather.reducer';

export const selectweather = createFeatureSelector<weatherState>('weather');

export const weatherSelector = createSelector(
  selectweather,
  (state: weatherState) => state.allUsers
);
// export const currentuserSelector = createSelector(
//   selectweather,
//   (state: UsersState) => state.selecteduser
// );