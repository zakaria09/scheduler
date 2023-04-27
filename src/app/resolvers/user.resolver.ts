import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { catchError, delay, map, Observable, of } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { User } from '../calendly.types';
import { TokenService } from '../services/token.service';

@Injectable({
  providedIn: 'root'
})
export class UserResolver implements Resolve<User> {
  constructor(
    private authService: AuthService,
    private tokenService: TokenService
    ) {}

  resolve(): Observable<User> {
    return this.authService.getCurrentUser().pipe(
      map(userResponse => userResponse.resource),
      catchError(() => {
        this.tokenService.removeToken()
        this.tokenService.removeRefreshToken()
        return of();
      }),
    );
  }
}
