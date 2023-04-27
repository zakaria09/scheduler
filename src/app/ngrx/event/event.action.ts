import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Collection, Pagination } from 'src/app/calendly.types';

export const EventsPageActions = createActionGroup({
  source: "Events Action Page",
  events: {
    // Action without props
    'Events Loading': emptyProps(),
    // Action with props
    'Events loaded': props<{ collection: Collection[]; pagination: Pagination }>(),
  },
});
