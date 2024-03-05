import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { ScheduleControlsComponent } from '../schedule-controls/schedule-controls.component';
import { ScheduleDaysComponent } from '../schedule-days/schedule-days.component';

@Component({
  selector: 'schedule-calendar',
  standalone: true,
  imports: [ScheduleControlsComponent, ScheduleDaysComponent],
  template: `
    <div class="calendar">
      <schedule-controls [selected]="selectedDay" (move)="onChange($event)">
      </schedule-controls>

      <schedule-days [selected]="selectedDayIndex" (select)="selectDay($event)">
      </schedule-days>
    </div>
  `,
  styleUrl: './schedule-calendar.component.scss',
})
export class ScheduleCalendarComponent implements OnChanges {
  selectedDayIndex!: number;
  selectedDay!: Date;
  selectedWeek!: Date;

  @Input()
  set date(date: Date | null) {
    this.selectedDay = date ? new Date(date.getTime()) : new Date();
  }

  @Output()
  change = new EventEmitter<Date>();

  constructor() {}

  ngOnChanges() {
    this.selectedDayIndex = this.getToday(this.selectedDay);
    this.selectedWeek = this.getStartOfWeek(new Date(this.selectedDay));
  }

  selectDay(index: number) {
    const selectedDay = new Date(this.selectedWeek);
    selectedDay.setDate(selectedDay.getDate() + index);
    this.change.emit(selectedDay);
  }

  onChange(weekOffset: number) {
    const startOfWeek = this.getStartOfWeek(new Date());
    const startDate = (
      new Date(startOfWeek.getFullYear(), startOfWeek.getMonth(), startOfWeek.getDate())
    );
    startDate.setDate(startDate.getDate() + (weekOffset * 7));
    this.change.emit(startDate);
  }

  private getToday(date: Date) {
    let today = date.getDay() - 1;
    if (today < 0) {
      today = 6;
    }
    return today;
  }

  private getStartOfWeek(date: Date) {
    const day = date.getDay();
    const diff = date.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(date.setDate(diff));
  }
}
