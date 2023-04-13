import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http'
import { Buffer } from 'buffer';
import { TokenService } from './token.service'
import { catchError, Observable, tap, throwError } from 'rxjs'
import { environment } from '../environments/environment'

const OAUTH_CLIENT = environment.appId;
const OAUTH_SECRET = environment.appSecret;
const API_URL = 'https://auth.calendly.com';

const HTTP_OPTIONS = {
  headers: new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded',
    Authorization: 'Basic ' + Buffer.from(OAUTH_CLIENT + ':' + OAUTH_SECRET).toString('base64')
  })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  redirectUrl = '';
  constructor(private http: HttpClient, private tokenService: TokenService) {
  }

  login(loginData: any): Observable<any> {
    this.tokenService.removeToken();
    this.tokenService.removeRefreshToken();
    const body = new HttpParams()
      .set('grant_type', 'authorization_code')
      .set('code', loginData.code)
      .set('redirect_uri', 'http://localhost:4200/auth');

    return this.http.post<any>(API_URL + '/oauth/token', body, HTTP_OPTIONS)
      .pipe(
        tap(res => {
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
    return this.http.post<any>(API_URL + 'oauth/token', body, HTTP_OPTIONS)
      .pipe(
        tap(res => {
          this.tokenService.saveToken(res.access_token);
          this.tokenService.saveRefreshToken(res.refresh_token);
        }),
        catchError(AuthService.handleError)
      );
  }
  register(data: any): Observable<any> {
    return this.http.post<any>(API_URL + 'oauth/signup', data)
      .pipe(
        tap(_ => AuthService.log('register')),
        catchError(AuthService.handleError)
      );
  }

  secured(): Observable<any> {
    return this.http.get<any>(API_URL + 'secret')
      .pipe(catchError(AuthService.handleError));
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

  private static log(message: string): any {
    console.log(message);
  }
}
