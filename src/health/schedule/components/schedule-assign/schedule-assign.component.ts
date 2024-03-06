import { NgForOf, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';
import { RouterLink } from '@angular/router';

// services
import { Meal } from '../../../shared/services/meals/meals.service';
import { Workout } from '../../../shared/services/workouts/workouts.service';
import { ListItem } from '../../../shared/services/schedule/schedule.service';

@Component({
  selector: 'schedule-assign',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NgIf, NgForOf, RouterLink],
  template: `
    <div class="schedule-assign">
      <div class="schedule-assign__modal">
        <div class="schedule-assign__title">
          <h1>
            <img
              src="/assets/img/{{
                section.type === 'workouts' ? 'workout' : 'food'
              }}.svg"
            />
            Assign {{ section.type }}
          </h1>
          <a class="btn__add" [routerLink]="getRoute(section.type)">
            <img src="/assets/img/add-white.svg" />
            New {{ section.type }}
          </a>
        </div>

        <div class="schedule-assign__list">
          <span class="schedule-assign__empty" *ngIf="!list?.length">
            <img src="/assets/img/face.svg" />
            Nothing here to assign
          </span>
          <div
            *ngFor="let item of list"
            [class.active]="exists(item.name)"
            (click)="toggleItem(item.name)"
          >
            {{ item.name }}
          </div>
        </div>

        <div class="schedule-assign__submit">
          <div>
            <button type="button" class="button" (click)="updateAssign()">
              Update
            </button>
            <button
              type="button"
              class="button button--cancel"
              (click)="cancelAssign()"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrl: './schedule-assign.component.scss',
})
export class ScheduleAssignComponent implements OnInit {
  private selected: string[] = [];

  @Input()
  section: any;

  @Input()
  list!: ListItem[];

  @Output()
  update = new EventEmitter<any>();

  @Output()
  cancel = new EventEmitter<any>();

  ngOnInit() {
    this.selected = [...this.section.assigned];
  }

  toggleItem(name: string) {
    if (this.exists(name)) {
      this.selected = this.selected.filter(item => item !== name);
    } else {
      this.selected = [...this.selected, name];
    }
  }

  getRoute(name: string) {
    return [`../${name}/new`];
  }

  exists(name: string) {
    return !!~this.selected.indexOf(name);
  }

  updateAssign() {
    this.update.emit({
      [this.section.type]: this.selected
    });
  }

  cancelAssign() {
    this.cancel.emit();
  }
}
