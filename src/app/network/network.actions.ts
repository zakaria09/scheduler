import { createAction, props } from '@ngrx/store';

export const statusUpdate = createAction(
  '[NETWORK] Status:',
  props<{ status: string }>()
);
