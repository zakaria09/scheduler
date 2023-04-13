import { Component } from '@angular/core';
import { CalendlyService } from '../calendly.service'
import { AuthService } from '../auth.service'

@Component({
  selector: 'app-schedules',
  templateUrl: './schedules.component.html',
  styleUrls: ['./schedules.component.scss']
})
export class SchedulesComponent {
  user: any
  constructor(private authService: AuthService) {
  }

  ngOnInit() {
    this.authService.getCurrentUser()
      .subscribe((userResponse) => {
      this.user = userResponse.resource
    })
  }
}
