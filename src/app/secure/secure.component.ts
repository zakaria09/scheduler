import { Component } from '@angular/core';
import { Router } from '@angular/router'
import { AuthService } from '../auth/auth.service'

@Component({
  selector: 'app-secure',
  templateUrl: './secure.component.html',
  styleUrls: ['./secure.component.scss']
})
export class SecureComponent {
  constructor(
    private router: Router,
    private authService: AuthService) {
  }
  logOut() {
    this.authService.logout()
    this.router.navigate(['/login'])
  }

}
