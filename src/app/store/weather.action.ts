import { createAction, props } from '@ngrx/store';
import { CityConditions } from '../shared/models/city-conditions';

// select the user first to effect then to reducer
export const getcityconditionsaction = createAction('[Weaather Component] GetCityaction',props<{ id: number }>());
export const getcityconditionsSuccessMsg = createAction(
  '[Weaather Component] getcity',
  props<{ CityConditions: CityConditions }>()
);
export const getcityconditionsErrorMsg = createAction(
    '[Weaather Component] GetUsers Error',
    props<{ error: string }>()
  );