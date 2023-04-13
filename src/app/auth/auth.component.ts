import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service'
import { TokenService } from '../token.service'
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {
  code!: string
  authenticated = false;

  constructor(private route: ActivatedRoute, private authService: AuthService, private tokenService: TokenService) { }

  ngOnInit() {
    if(this.tokenService.getToken() !== null) {
      console.log('AUTHENTICATED')
      this.authenticated = true;
    } else {
      this.route.queryParams
        .subscribe((params: any) => {
            console.log(params);
            this.code = params.code;
            console.log(this.code);
            this.authService.login(params).subscribe((sub) => console.log(sub));
          }
        );
    }
  }
}
