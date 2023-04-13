import { Component } from '@angular/core';
import { SchedulesService } from '../schedules.service'

@Component({
  selector: 'app-schedules',
  templateUrl: './schedules.component.html',
  styleUrls: ['./schedules.component.scss']
})
export class SchedulesComponent {
  user: any
  constructor(private scheduleService: SchedulesService) {
  }

  ngOnInit() {
    this.scheduleService.getCurrentUser()
      .subscribe((userResponse) => {
      this.user = userResponse.resource
    })
  }
}
