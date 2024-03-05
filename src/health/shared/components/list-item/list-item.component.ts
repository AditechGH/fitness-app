import { NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { RouterLink } from '@angular/router';

// pipes
import { JoinPipe } from '../../pipes/join/join.pipe';
import { WorkoutPipe } from '../../pipes/workout/workout.pipe';

@Component({
  selector: 'list-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NgIf, RouterLink, JoinPipe, WorkoutPipe],
  template: `
    <div class="list-item">
      <a [routerLink]="getRoute(item)">
        <p class="list-item__name">{{ item.name }}</p>
        <p class="list-item__ingredients">
          <span *ngIf="item.ingredients; else showWorkout">
            {{ item.ingredients | join }}
          </span>
        </p>
        <ng-template #showWorkout>
          <span>{{ item | workout }}</span>
        </ng-template>
      </a>
      <div *ngIf="toggled" class="list-item__delete">
        <p>Delete item?</p>
        <button class="confirm" type="button" (click)="removeItem()">
          Yes
        </button>
        <button class="cancel" type="button" (click)="toggle()">No</button>
      </div>

      <button class="trash" type="button" (click)="toggle()">
        <img src="/assets/img/remove.svg" alt="" />
      </button>
    </div>
  `,
  styleUrl: './list-item.component.scss',
})
export class ListItemComponent {
  toggled = false;

  @Input()
  item!: any;

  @Output()
  remove = new EventEmitter<any>();

  toggle() {
    this.toggled = !this.toggled;
  }

  removeItem() {
    this.remove.emit(this.item);
  }

  getRoute(item: any) {
    return [`../${item.ingredients ? 'meals' : 'workouts'}`, item.$key];
  }
}
