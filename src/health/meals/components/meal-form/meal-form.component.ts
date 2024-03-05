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

import { Meal } from '../../../shared/services/meals/meals.service';

@Component({
  selector: 'meal-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, NgForOf, NgIf],
  template: `
    <div class="meal-form">
      <form [formGroup]="form">
        <!-- name -->
        <div class="meal-form__name">
          <label>
            <h3>Meal name</h3>
            <input
              type="text"
              placeholder="e.g. English Breakfast"
              formControlName="name"
            />
            <div class="error" *ngIf="required">Workout name is required.</div>
          </label>
        </div>
        <!-- food -->
        <div class="meal-form__food">
          <div class="meal-form__subtitle">
            <h3>Food</h3>
            <button
              type="button"
              class="meal-form__add"
              (click)="addIngredient()"
            >
              <img src="/assets/img/add-white.svg" />
              Add food
            </button>
          </div>
          <div formArrayName="ingredients">
            <label *ngFor="let c of ingredients?.controls; index as i">
              <input [formControlName]="i" placeholder="e.g. Eggs" />
              <span class="meal-form__remove" (click)="removeIngredient(i)">
              </span>
            </label>
          </div>
        </div>
        <!-- submit -->
        <div class="meal-form__submit">
          <div>
            <button *ngIf="!exists" type="button" class="button" (click)="createMeal()">
              Create meal
            </button>
            <button
              *ngIf="exists"
              type="button"
              class="button"
              (click)="updateMeal()"
            >
              Save
            </button>
            <a class="button button--cancel" routerLink="../">Cancel</a>
          </div>

          <!-- delete -->
          <div class="meal-form__delete" *ngIf="exists">
            <div *ngIf="toggled">
              <p>Delete item?</p>
              <button class="confirm" type="button" (click)="removeMeal()">
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
  styleUrl: './meal-form.component.scss',
})
export class MealFormComponent implements OnChanges {
  private _fb: FormBuilder = inject(FormBuilder);

  toggled = false;
  exists = false;

  @Input()
  meal!: Meal;

  @Output()
  create = new EventEmitter<Partial<Meal>>();

  @Output()
  update = new EventEmitter<Partial<Meal>>();

  @Output()
  remove = new EventEmitter<Partial<Meal>>();

  form = this._fb.group({
    name: ['', Validators.required],
    ingredients: this._fb.array(['']),
  });

  ngOnChanges(changes: SimpleChanges): void {
    // if (changes['meal'].currentValue.name) {
    //   this.exists = true;
    // }
    if (this.meal && this.meal.name) {
      this.exists = true;
      this.emptyIngredients();

      const value = this.meal;
      this.form.patchValue(value);

      if (value.ingredients) {
        for (const item of value.ingredients) {
          this.ingredients.push(new FormControl(item));
        }
      }
    }
  }

  emptyIngredients(): void {
    while (this.ingredients.controls.length) {
      this.ingredients.removeAt(0);
    }
  }

  get required() {
    return (
      this.form.get('name')?.hasError('required') &&
      this.form.get('name')?.touched
    );
  }

  get ingredients(): FormArray {
    return this.form.get('ingredients') as FormArray;
  }

  addIngredient(): void {
    this.ingredients.push(new FormControl(''));
  }

  removeIngredient(index: number): void {
    this.ingredients.removeAt(index);
  }

  createMeal(): void {
    if (this.form.valid) {
      this.create.emit(this.form.value);
    }
  }

  updateMeal(): void {
    if (this.form.valid) {
      this.update.emit(this.form.value);
    }
  }

  removeMeal(): void {
    this.remove.emit(this.form.value);
  }

  toggle(): void {
    this.toggled = !this.toggled;
  }
}
