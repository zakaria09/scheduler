import { Component } from '@angular/core';
import { CalendlyService } from '../calendly.service'
import { AuthService } from '../auth.service'
import { ScheduleService } from '../schedule.service';

@Component({
  selector: 'app-schedules',
  templateUrl: './schedules.component.html',
  styleUrls: ['./schedules.component.scss']
})
export class SchedulesComponent {
  user: any
  constructor(
    private authService: AuthService,
    private schedule: ScheduleService
    ) {
  }

  ngOnInit() {
    this.authService.getCurrentUser()
      .subscribe((userResponse) => {
        console.log(userResponse.resource);
      this.user = userResponse.resource
      this.schedule.getUserAvailability(userResponse.resource.uri)
        .subscribe((availability) => { console.log(availability) })
    })
  }
}
