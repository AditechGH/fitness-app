import { AsyncPipe, NgIf } from '@angular/common';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Store } from 'store';

// components
import { ScheduleAssignComponent } from '../../components/schedule-assign/schedule-assign.component';
import { ScheduleCalendarComponent } from '../../components/schedule-calendar/schedule-calendar.component';

// services
import {
  Meal,
  MealsService,
} from '../../../shared/services/meals/meals.service';
import {
  ListItem,
  ScheduleItem,
  ScheduleService,
} from '../../../shared/services/schedule/schedule.service';
import {
  Workout,
  WorkoutsService,
} from '../../../shared/services/workouts/workouts.service';

@Component({
  selector: 'schedule',
  standalone: true,
  imports: [
    AsyncPipe,
    NgIf,
    ScheduleCalendarComponent,
    ScheduleAssignComponent,
  ],

  template: `
    <div class="schedule">
      <schedule-calendar
        [date]="(date$ | async)!"
        [items]="(schedule$ | async)!"
        (change)="changeDate($event)"
        (select)="changeSection($event)"
      ></schedule-calendar>

      <schedule-assign
        *ngIf="open"
        [section]="(selected$ | async)!"
        [list]="(list$ | async)!"
        (update)="assignItem($event)"
        (cancel)="closeAssign()"
      >
      </schedule-assign>
    </div>
  `,
  styleUrl: './schedule.component.scss',
})
export class ScheduleComponent implements OnInit, OnDestroy {
  private _store: Store = inject(Store);
  private _scheduleService: ScheduleService = inject(ScheduleService);
  private _mealsService: MealsService = inject(MealsService);
  private _workoutsService: WorkoutsService = inject(WorkoutsService);

  open = false;

  date$!: Observable<Date>;
  selected$!: Observable<any>;
  list$!: Observable<ListItem[]>;
  schedule$!: Observable<ScheduleItem[]>;
  subscriptions: Subscription[] = [];

  changeDate(date: Date) {
    this._scheduleService.updateDate(date);
  }

  changeSection(event: any) {
    this.open = true;
    this._scheduleService.selectSection(event);
  }

  ngOnInit() {
    this.date$ = this._store.select('date');
    this.schedule$ = this._store.select('schedule');
    this.selected$ = this._store.select('selected');
    this.list$ = this._store.select('list');

    this.subscriptions = [
      this._scheduleService.schedule$.subscribe(),
      this._scheduleService.selected$.subscribe(),
      this._scheduleService.list$.subscribe(),
      this._scheduleService.items$.subscribe(),
      this._mealsService.meals$.subscribe(),
      this._workoutsService.workouts$.subscribe(),
    ];
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  assignItem(items: string[]) {
    this._scheduleService.updateItems(items);
    this.closeAssign();
  }


  closeAssign() {
    this.open = false;
  }
}
