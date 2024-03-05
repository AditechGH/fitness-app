import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Store } from 'store';

import { ListItemComponent } from '../../../shared/components/list-item/list-item.component';
import {
  Workout,
  WorkoutsService,
} from '../../../shared/services/workouts/workouts.service';

@Component({
  selector: 'workouts',
  standalone: true,
  imports: [AsyncPipe, NgIf, NgForOf, RouterLink, ListItemComponent],
  template: `
    <div class="workouts">
      <div class="workouts__title">
        <h1>
          <img src="/assets/img/workout.svg" alt="workout" />
          Your workouts
        </h1>
        <a class="btn__add" routerLink="../workouts/new">
          <img src="/assets/img/add-white.svg" alt="add" />New workout</a
        >
      </div>
      <div *ngIf="workouts$ | async as workouts; else loading">
        <div class="message" *ngIf="!workouts.length">
          <img src="/assets/img/face.svg" alt="" /> No workouts, add a workout
          to start
        </div>
        <!-- workouts -->
        <list-item
          *ngFor="let workout of workouts"
          [item]="workout"
          (remove)="removeWorkout($event)"
        ></list-item>
      </div>
      <!-- loading -->
      <ng-template #loading>
        <div class="message">
          <img src="/assets/img/loading.svg" alt="" /> Fetching workouts...
        </div>
      </ng-template>
    </div>
  `,
  styleUrl: './workouts.component.scss',
})
export class WorkoutsComponent implements OnInit, OnDestroy {
  private _workoutsService: WorkoutsService = inject(WorkoutsService);
  private _store: Store = inject(Store);

  workouts$!: Observable<Workout[]>;
  subscription!: Subscription;

  ngOnInit(): void {
    this.subscription = this._workoutsService.workouts$.subscribe();
    this.workouts$ = this._store.select('workouts');
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  removeWorkout(event: Workout) {
    this._workoutsService.removeWorkout(event.$key);
  }
}
