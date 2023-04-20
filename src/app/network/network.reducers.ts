import { createReducer, on } from '@ngrx/store'
import * as NetworkActions from './network.actions';


export enum NetworkStatus {
  offline = 'OFFLINE',
  online = 'OnLINE'
}

export interface State {
  status: NetworkStatus;
}

export const initialState: State = {
  status: NetworkStatus.online
}

export const networkReducer = createReducer(initialState,
  on(NetworkActions.statusUpdate, (state, { status }) => ({ ...state, status: status as NetworkStatus }))
)
