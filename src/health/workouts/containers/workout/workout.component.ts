import { AsyncPipe, NgIf } from '@angular/common';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription, switchMap } from 'rxjs';

import { WorkoutFormComponent } from '../../components/workout-form/workout-form.component';
import { Workout, WorkoutsService } from '../../../shared/services/workouts/workouts.service';


@Component({
  selector: 'workout',
  standalone: true,
  imports: [NgIf, AsyncPipe, WorkoutFormComponent],
  template: `
    <div class="workout">
      <div class="workout__title">
        <h1>
          <img src="/assets/img/workout.svg" alt="" />
          <span *ngIf="workout$ | async as workout; else title">
            {{ workout.name ? 'Edit' : 'Create' }} workout
          </span>
          <ng-template #title> Loading... </ng-template>
        </h1>
      </div>
      <div *ngIf="workout$ | async as workout; else loading">
        <workout-form
          [workout]="workout"
          (create)="addWorkout($event)"
          (update)="updateWorkout($event)"
          (remove)="removeWorkout($event)"
        >
        </workout-form>
      </div>
      <ng-template #loading>
        <div class="message">
          <img src="/assets/img/loading.svg" alt="" />
          Fetching workout...
        </div>
      </ng-template>
    </div>
  `,
  styleUrl: './workout.component.scss',
})
export class WorkoutComponent implements OnInit, OnDestroy {
  private _workoutsService: WorkoutsService = inject(WorkoutsService);
  private router: Router = inject(Router);
  private route: ActivatedRoute = inject(ActivatedRoute);

  workout$!: Observable<Workout | undefined>;
  subscription!: Subscription;

  ngOnInit(): void {
    this.subscription = this._workoutsService.workouts$.subscribe();
    this.workout$ = this.route.params.pipe(
      switchMap((param) => this._workoutsService.getWorkout(param['id']))
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  async addWorkout(event: Partial<Workout>) {
    await this._workoutsService.addWorkout(event);
    this.backToworkouts();
  }

  async updateWorkout(event: Partial<Workout>) {
    const key = this.route.snapshot.params['id'];
    await this._workoutsService.updateWorkout(key, event);
    this.backToworkouts();
  }

  async removeWorkout(event: Partial<Workout>) {
    const key = this.route.snapshot.params['id'];
    await this._workoutsService.removeWorkout(key);
    this.backToworkouts();
  }

  backToworkouts() {
    this.router.navigate(['workouts']);
  }
}
