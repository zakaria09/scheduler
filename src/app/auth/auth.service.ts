import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http'
import { Buffer } from 'buffer';
import { catchError, Observable, tap, throwError } from 'rxjs'
import { TokenService } from '../services/token.service'
import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  redirectUrl = '';
  constructor(private http: HttpClient, private tokenService: TokenService) {
  }

  getCurrentUser(): Observable<any> {
    return this.http.get(`${environment.calendlyUrl}/users/me`)
  }

  getUserSchedule(uuid: string): Observable<any> {
    return this.http.get(`${environment.calendlyUrl}/users/${uuid}`)
  }

  login(loginData: any): Observable<any> {
    this.tokenService.removeToken();
    this.tokenService.removeRefreshToken();
    const body = new HttpParams()
      .set('grant_type', 'authorization_code')
      .set('code', loginData.code)
      .set('redirect_uri', environment.authRedirectUrl);

    // I'd much rather do this in an API. I'm not happy having secrets around here
    return this.http.post<any>('http://localhost:3000/auth', body, {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: 'Basic ' + Buffer.from(environment.appId + ':' + environment.appSecret).toString('base64')
      })
    })
      .pipe(
        tap(res => {
          console.log(res)
          this.tokenService.saveToken(res.access_token);
          this.tokenService.saveRefreshToken(res.refresh_token);
        }),
        catchError(AuthService.handleError)
      );
  }

  refreshToken(refreshData: any): Observable<any> {
    this.tokenService.removeToken();
    this.tokenService.removeRefreshToken();
    const body = new HttpParams()
      .set('refresh_token', refreshData.refresh_token)
      .set('grant_type', 'refresh_token');
    return this.http.post<any>(environment.calendlyAuthUrl + 'oauth/token', body, {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: 'Basic ' + Buffer.from(environment.appId + ':' + environment.appSecret).toString('base64')
      })
    })
      .pipe(
        tap(res => {
          this.tokenService.saveToken(res.access_token);
          this.tokenService.saveRefreshToken(res.refresh_token);
        }),
        catchError(AuthService.handleError)
      );
  }

  logout(): void {
    this.tokenService.removeToken();
    this.tokenService.removeRefreshToken();
  }

  private static handleError(error: HttpErrorResponse): any {
    console.error(error)
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}
