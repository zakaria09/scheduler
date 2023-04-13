import { Component } from '@angular/core';
import { environment } from '../../environments/environment';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  url = `https://auth.calendly.com/oauth/authorize?client_id=${environment.appId}&response_type=code&redirect_uri=http://localhost:4200/auth`
}
