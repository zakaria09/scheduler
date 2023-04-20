import { Component, HostListener } from '@angular/core'
import { AuthService } from '../auth/auth.service'
import { liveQuery } from 'dexie'
import { AppDB } from '../db/db'
import { catchError, fromEvent, map, Observable, Subscription, throwError } from 'rxjs'
import { TokenService } from '../token.service'
import { FormControl, FormGroup } from '@angular/forms'
import cuid from 'cuid'
import { decrement, increment, reset } from './schedules.actions'
import { Store } from '@ngrx/store'
import { statusUpdate } from '../network/network.actions'
import { NetworkStatus } from '../network/network.reducers'

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
  templateUrl: './schedules.component.html',
  styleUrls: ['./schedules.component.scss']
})
export class SchedulesComponent {
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

  onSubmit = async () => {
    await db.events.add({
      id: cuid(),
      description: this.newEvent.value.description ?? '',
      date: new Date(this.newEvent.value.date ?? '')
    })
    this.newEvent.reset()
  }
  netWorkStatusOffline = NetworkStatus.offline

  constructor(private authService: AuthService, private tokenService: TokenService, private store: Store<{ count: number, network: any }>) {
    this.count$ = store.select('count')
    this.network$ = store.select('network')

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

    this.authService.getCurrentUser().pipe(
      map(res => res),
      catchError((error) => {
        this.tokenService.removeToken()
        this.tokenService.removeRefreshToken()
        return throwError(error)
      })
    ).subscribe({
      next: (userResponse) => {
        this.user = userResponse.resource
        db.logins.add(userResponse.resource)
        const urlSplit = userResponse.resource.uri.split('/')
        const lengthOfSplit = urlSplit.length
        this.authService.getUserSchedule(urlSplit[lengthOfSplit - 1])
          .subscribe((schedule) => console.log(schedule))
      },
      error: (error) => console.error(error)
    })
  }
}
