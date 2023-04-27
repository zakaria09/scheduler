import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  constructor(
    private http: HttpClient
    ) { }

  getScheduledEvents(user: { current_organization: string; uri: string }): Observable<any> {
    return this.http.get(`${environment.calendlyUrl}/scheduled_events?organization=${user.current_organization}&user=${user.uri}`)
  }

}
