import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'schedule-controls',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [DatePipe],
  template: `
    <div class="controls">
      <button type="button" (click)="moveDate(offset - 1)">
        <img src="assets/img/chevron-left.svg" />
      </button>
      <p>{{ selected | date : 'MMMM d, Y' }}</p>
      <button type="button" (click)="moveDate(offset + 1)">
        <img src="assets/img/chevron-right.svg" />
      </button>
    </div>
  `,
  styleUrl: './schedule-controls.component.scss',
})
export class ScheduleControlsComponent {
  offset = 0;

  @Input()
  selected!: Date;

  @Output()
  move = new EventEmitter<number>();

  moveDate(offset: number) {
    this.offset = offset;
    this.move.emit(offset);
  }
}
