import { JsonPipe } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'list-item',
  standalone: true,
  imports: [JsonPipe],
  template: `
    <div class="list-item">
      {{ item | json }}
    </div>
  `,
  styleUrl: './list-item.component.scss',
})
export class ListItemComponent<T> {
  @Input()
  item!: T;
}
