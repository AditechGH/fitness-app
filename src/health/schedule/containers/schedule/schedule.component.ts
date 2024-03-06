import { AsyncPipe } from '@angular/common';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Store } from 'store';

// component
import { ScheduleCalendarComponent } from '../../components/schedule-calendar/schedule-calendar.component';

// service
import {
  ScheduleList,
  ScheduleService,
} from '../../../shared/services/schedule/schedule.service';

@Component({
  selector: 'schedule',
  standalone: true,
  imports: [AsyncPipe, ScheduleCalendarComponent],
  template: `
    <div class="schedule">
      <schedule-calendar
        [date]="(date$ | async)!"
        [items]="(schedule$ | async)!"
        (change)="changeDate($event)"
        (select)="changeSection($event)"
      ></schedule-calendar>
    </div>
  `,
  styleUrl: './schedule.component.scss',
})
export class ScheduleComponent implements OnInit, OnDestroy {
  private _store: Store = inject(Store);
  private _scheduleService: ScheduleService = inject(ScheduleService);

  date$!: Observable<Date>;
  schedule$!: Observable<ScheduleList>;
  subscriptions: Subscription[] = [];

  changeDate(date: Date) {
    this._scheduleService.updateDate(date);
  }

  changeSection(event: any) {
    this._scheduleService.selectSection(event);
  }

  ngOnInit(): void {
    this.date$ = this._store.select('date');
    this.schedule$ = this._store.select('date');

    this.subscriptions = [
      this._scheduleService.schedule$.subscribe(),
      this._scheduleService.selected$.subscribe(),
    ];
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
