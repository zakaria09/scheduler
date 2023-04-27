import { createReducer, on } from '@ngrx/store';
import * as _ from 'lodash';
import { ScheduledEvent } from 'src/app/calendly.types';
import { EventsPageActions } from './event.action';

const initialState: ScheduledEvent = {
  isLoading: false,
  error: null,
  collection: [
    {
      uri: '',
      name: '',
      status: "active",
      start_time: '',
      end_time: '',
      event_type: '',
      location: {
        type: '',
        location: ''
      },
      invitees_counter: {
        total: 0,
        active: 0,
        limit: 0
      },
      created_at: '',
      updated_at: '',
      event_memberships: [
        {
          user: "https://api.calendly.com/users/GBGBDCAADAEDCRZ2"
        }
      ],
      event_guests: [
        {
          "email": "user@example.com",
          "created_at": "2022-04-21T17:10:48.484945Z",
          "updated_at": "2022-04-21T17:11:01.758636Z"
        }
      ],
      calendar_event: {
        "kind": "google",
        "external_id": "8suu9k3hj00mni03ss12ba0ce0"
      }
    }
  ],
  pagination: {
    count: 0,
    next_page: '',
    previous_page: '',
    next_page_token: '',
    previous_page_token: ''
  }
}

export const eventReducer = createReducer(
  initialState,
  on(EventsPageActions.eventsLoaded, (state, action) =>
    ({ ...state, isLoading: true  })),
  on(EventsPageActions.eventsLoaded, (state, { collection, pagination }) =>
    ({ ...state, isLoading: false, collection, pagination })),
);
