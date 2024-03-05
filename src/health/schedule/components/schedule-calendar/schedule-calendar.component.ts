import { JsonPipe } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'schedule-calendar',
  standalone: true,
  imports: [JsonPipe],
  template: `
    <div class="calendar">
      {{ date | json }}
    </div>
  `,
  styleUrl: './schedule-calendar.component.scss',
})
export class ScheduleCalendarComponent {
  @Input()
  date!: Date | null;
}
