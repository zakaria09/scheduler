import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { delay, map, Observable, of } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { User } from '../calendly.types';

@Injectable({
  providedIn: 'root'
})
export class UserResolver implements Resolve<User> {
  constructor(private authService: AuthService) {}

  resolve(): Observable<User> {
    return this.authService.getCurrentUser().pipe(
      map(userResponse => userResponse.resource)
    );
  }
}
