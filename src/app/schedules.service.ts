import { Injectable } from '@angular/core';
import { TokenService } from './token.service'
import { catchError, Observable, tap } from 'rxjs'
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'
import { environment } from '../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class SchedulesService {
  constructor(private tokenService: TokenService, private http: HttpClient) { }

  getCurrentUser(): Observable<any> {
    return this.http.get(`${environment.calendlyUrl}/users/me`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.tokenService.getToken()}`
      })
    })
  }
}
