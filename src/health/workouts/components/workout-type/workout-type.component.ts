import { NgForOf } from '@angular/common';
import { ChangeDetectionStrategy, Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export const TYPE_CONTROL_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => WorkoutTypeComponent),
  multi: true,
};

@Component({
  selector: 'workout-type',
  providers: [TYPE_CONTROL_ACCESSOR],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NgForOf],
  template: `
    <div class="workout-type">
      <div
        class="workout-type__pane"
        *ngFor="let selector of selectors"
        [class.active]="selector === value"
        (click)="setSelected(selector)"
      >
        <img src="/assets/img/{{ selector }}.svg" alt="" />
        <p>{{ selector }}</p>
      </div>
    </div>
  `,
  styleUrl: './workout-type.component.scss',
})
export class WorkoutTypeComponent implements ControlValueAccessor {
  selectors = ['strength', 'endurance'];

  value!: string;

  private onTouch!: Function;
  private onModelChange!: Function;

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  registerOnChange(fn: any): void {
    this.onModelChange = fn;
  }

  writeValue(value: string): void {
    this.value = value;
  }

  setSelected(value: string) {
    this.value = value;
    this.onModelChange(value);
    this.onTouch();
  }
}
