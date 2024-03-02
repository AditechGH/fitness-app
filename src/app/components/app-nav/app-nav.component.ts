import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-nav',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <div class="app-nav">
      <div class="wrapper">
        <a routerLink="schedule" routerLinkActive="active">Schedule</a>
        <a routerLink="meals" routerLinkActive="active">Meals</a>
        <a routerLink="workouts" routerLinkActive="active">Workouts</a>
      </div>
    </div>
  `,
  styleUrl: './app-nav.component.scss',
})
export class AppNavComponent {}
