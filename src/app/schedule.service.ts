import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  constructor(private http: HttpClient) { }

  getUserAvailability(userUri: string): Observable<any> {
    return this.http.get(`${environment.calendlyUrl}/user_availability_schedules?user=${userUri}`)
  }
}
