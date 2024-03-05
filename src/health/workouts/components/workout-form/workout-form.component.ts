import { NgForOf, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  inject,
} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';

import { Workout } from '../../../shared/services/workouts/workouts.service';
import { WorkoutTypeComponent } from '../workout-type/workout-type.component';

@Component({
  selector: 'workout-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, NgForOf, NgIf, WorkoutTypeComponent],
  template: `
    <div class="workout-form">
      <form [formGroup]="form">
        <!-- name -->
        <div class="workout-form__name">
          <label>
            <h3>Workout name</h3>
            <input
              type="text"
              placeholder="e.g. English Breakfast"
              formControlName="name"
            />
            <div class="error" *ngIf="required">Workout name is required.</div>
          </label>

          <label>
            <h3>Type</h3>
            <workout-type formControlName="type"></workout-type>
          </label>
        </div>
    
        <!-- submit -->
        <div class="workout-form__submit">
          <div>
            <button *ngIf="!exists" type="button" class="button" (click)="createWorkout()">
              Create workout
            </button>
            <button
              *ngIf="exists"
              type="button"
              class="button"
              (click)="updateWorkout()"
            >
              Save
            </button>
            <a class="button button--cancel" routerLink="../">Cancel</a>
          </div>

          <!-- delete -->
          <div class="workout-form__delete" *ngIf="exists">
            <div *ngIf="toggled">
              <p>Delete item?</p>
              <button class="confirm" type="button" (click)="removeWorkout()">
                Yes
              </button>
              <button class="cancel" type="button" (click)="toggle()">
                No
              </button>
            </div>

            <button
              class="button button--delete"
              type="button"
              (click)="toggle()"
            >
              Delete
            </button>
          </div>
        </div>
      </form>
    </div>
  `,
  styleUrl: './workout-form.component.scss',
})
export class WorkoutFormComponent implements OnChanges {
  private _fb: FormBuilder = inject(FormBuilder);

  toggled = false;
  exists = false;

  @Input()
  workout!: Workout;

  @Output()
  create = new EventEmitter<Partial<Workout>>();

  @Output()
  update = new EventEmitter<Partial<Workout>>();

  @Output()
  remove = new EventEmitter<Partial<Workout>>();

  form = this._fb.group({
    name: ['', Validators.required],
    type: ['strength'],
  });

  ngOnChanges(changes: SimpleChanges): void {
    if (this.workout && this.workout.name) {
      this.exists = true;

      const value = this.workout;
      this.form.patchValue(value);

    }
  }

  get required() {
    return (
      this.form.get('name')?.hasError('required') &&
      this.form.get('name')?.touched
    );
  }


  createWorkout(): void {
    if (this.form.valid) {
      this.create.emit(this.form.value);
    }
  }

  updateWorkout(): void {
    if (this.form.valid) {
      this.update.emit(this.form.value);
    }
  }

  removeWorkout(): void {
    this.remove.emit(this.form.value);
  }

  toggle(): void {
    this.toggled = !this.toggled;
  }
}
