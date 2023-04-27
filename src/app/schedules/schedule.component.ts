import { Component, HostListener } from '@angular/core'
import { AuthService } from '../auth/auth.service'
import { liveQuery } from 'dexie'
import { AppDB } from '../db/db'
import { catchError, fromEvent, map, Observable, Subscription, throwError } from 'rxjs'
import { FormControl, FormGroup } from '@angular/forms'
import cuid from 'cuid'
import { Store } from '@ngrx/store'
import { statusUpdate } from '../network/network.actions'
import { NetworkStatus } from '../network/network.reducers'
import { ScheduleService } from '../services/schedule.service';
import { ScheduledEvent, User } from '../calendly.types'
import { EventsPageActions } from '../ngrx/event/event.action'
import { ActivatedRoute } from '@angular/router'

const db = new AppDB()

async function listEvents() {
  //
  // Query the DB using our promise based API.
  // The end result will magically become
  // observable.
  //
  return await db.events
    .toArray()
}

@Component({
  selector: 'app-schedules',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent {
  user: any
  events$ = liveQuery(() => listEvents())

  offlineEvent: Observable<Event>;
  onlineEvent: Observable<Event>;
  subscriptions: Subscription[] = [];

  private handleAppConnectivityChanges(): void {
    this.onlineEvent = fromEvent(window, 'online');
    this.offlineEvent = fromEvent(window, 'offline');

    this.subscriptions.push(this.onlineEvent.subscribe(e => {
      // handle online mode
      console.log('Online...');
    }));

    this.subscriptions.push(this.offlineEvent.subscribe(e => {
      // handle offline mode
      console.log('Offline...');
    }));
  }

  newEvent = new FormGroup({
    description: new FormControl(''),
    date: new FormControl('')
  })
  count$: Observable<number>
  network$: Observable<any>
  schedule$: Observable<ScheduledEvent> | undefined;

  onSubmit = async () => {
    await db.events.add({
      id: cuid(),
      description: this.newEvent.value.description ?? '',
      date: new Date(this.newEvent.value.date ?? '')
    })
    this.newEvent.reset()
  }
  netWorkStatusOffline = NetworkStatus.offline

  constructor(
    private store: Store<{ count: number, network: any, events: ScheduledEvent }>,
    private schedule: ScheduleService,
    private activatedRoute: ActivatedRoute
    ) {
    this.count$ = store.select('count')
    this.network$ = store.select('network')
    this.schedule$ = store.select('events');

    this.onlineEvent = fromEvent(window, 'online');
    this.offlineEvent = fromEvent(window, 'offline');
  }

  @HostListener('window:offline')
  setNetworkOffline(): void {
    this.store.dispatch(statusUpdate({ status: NetworkStatus.offline }))
  }

  @HostListener('window:online')
  setNetworkOnline(): void {
    this.store.dispatch(statusUpdate({ status: NetworkStatus.offline }))
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  ngOnInit() {
    this.handleAppConnectivityChanges();

    this.activatedRoute.data.subscribe(res => {
      const userData = (res as { user: User }).user;
      this.schedule.getScheduledEvents(userData)
        .subscribe({
          next: res => this.store.dispatch(EventsPageActions.eventsLoaded(res)),
          error: err =>  console.log(err)
        }
        );
    })

    this.store.select('events')
      .subscribe(res => console.log(res))
  }
}
