import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <h1>Hello, {{ title }}</h1>
    <div class="wrapper">
      <router-outlet></router-outlet>
    </div>
  `,
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'Fitness app';
}
