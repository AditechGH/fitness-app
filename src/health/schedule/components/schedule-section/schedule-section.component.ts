import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

import { ScheduleItem } from '../../../shared/services/schedule/schedule.service';
import { NgIf } from '@angular/common';
import { JoinPipe } from '../../../shared/pipes/join/join.pipe';
import { Workout } from '../../../shared/services/workouts/workouts.service';
import { Meal } from '../../../shared/services/meals/meals.service';

@Component({
  selector: 'schedule-section',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NgIf, JoinPipe],
  template: `
    <div class="schedule-section">
      <div class="schedule-section__bar">
        {{ name }}
      </div>

      <div>
        <div
          class="schedule-section__item food"
          *ngIf="section.meals; else addMeal"
          (click)="onSelect('meals', section.meals)"
        >
          <span>{{ section.meals | join }}</span>
        </div>
        <ng-template #addMeal>
          <div class="schedule-section__item" (click)="onSelect('meals')">
            Assign meal
          </div>
        </ng-template>
        <div
          class="schedule-section__item workout"
          *ngIf="section.workouts; else addWorkout"
          (click)="onSelect('workouts', section.workouts)"
        >
          <span>{{ section.workouts | join }}</span>
        </div>
        <ng-template #addWorkout>
          <div class="schedule-section__item" (click)="onSelect('workouts')">
            Assign workout
          </div>
        </ng-template>
      </div>
    </div>
  `,
  styleUrl: './schedule-section.component.scss',
})
export class ScheduleSectionComponent {
  @Input()
  name!: string;

  @Input()
  section!: ScheduleItem;

  @Output()
  select = new EventEmitter<any>();

  onSelect(type: string, assigned: (Workout | Meal)[] = []) {
    const data = this.section;
    this.select.emit({
      type,
      assigned,
      data,
    });
  }
}
