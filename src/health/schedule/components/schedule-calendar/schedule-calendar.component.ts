import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ScheduleControlsComponent } from '../schedule-controls/schedule-controls.component';

@Component({
  selector: 'schedule-calendar',
  standalone: true,
  imports: [ScheduleControlsComponent],
  template: `
    <div class="calendar">
      <schedule-controls [selected]="selectedDay" (move)="onChange($event)">
      </schedule-controls>
    </div>
  `,
  styleUrl: './schedule-calendar.component.scss',
})
export class ScheduleCalendarComponent {
  selectedDay!: Date;

  @Input()
  set date(date: Date | null) {
    this.selectedDay = date ?? new Date();
  }

  @Output()
  change = new EventEmitter<Date>();

  onChange(weekOffset: number) {
    const startOfWeek = this.getStartOfWeek(new Date());
    const startDate = new Date(
      startOfWeek.getFullYear(),
      startOfWeek.getMonth(),
      startOfWeek.getDate()
    );
    startDate.setDate(startDate.getDate() + weekOffset * 7);
    this.change.emit(startDate);
  }

  private getStartOfWeek(date: Date) {
    const day = date.getDay();
    const diff = date.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(date.setDate(diff));
  }
}
