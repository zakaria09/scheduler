import { Component } from '@angular/core';
import { environment } from '../../environments/environment';
import { TokenService } from '../services/token.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent  {
  url = `https://auth.calendly.com/oauth/authorize?client_id=${environment.appId}&response_type=code&redirect_uri=http://localhost:4200/auth`

  constructor(
    private tokenService: TokenService
  ) {}

  ngOninit() {
    this.tokenService.removeToken()
    this.tokenService.removeRefreshToken()
  }
}
