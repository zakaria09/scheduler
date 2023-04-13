import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import { AuthService } from '../auth.service'
import { TokenService } from '../token.service'
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {
  code!: string | null
  authenticated = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private tokenService: TokenService
  ) { }

  ngOnInit() {
    if(this.tokenService.getToken() !== null) {
      this.authenticated = true;
    } else {
      this.route.queryParams
        .subscribe((params: any) => {
            this.code = params.code;
            this.authService.login(params).subscribe((sub) => {
              if (sub.access_token) {
                this.router.navigate(['/schedules']) .then(nav => {
                  this.code = null
                }, err => {
                  console.log(err) // when there's an error
                });
              }
            });
          }
        );
    }
  }
}
