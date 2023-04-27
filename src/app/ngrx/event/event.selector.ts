import { createSelector } from '@ngrx/store';
import { ScheduledEvent } from 'src/app/calendly.types';
import { AppState } from '../app.state';

export const selectEvents = (state: AppState) => state.event;
export const selectEvent = createSelector(
  selectEvents,
  (state: ScheduledEvent) => state
);
