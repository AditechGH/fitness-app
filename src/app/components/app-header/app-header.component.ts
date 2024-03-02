import { NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

// interfaces
import { User } from '../../../auth/shared/services/auth/auth.service';

@Component({
  selector: 'app-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NgIf],
  template: `
    <div class="app-header">
      <div class="wrapper">
        <img src="/assets/img/logo.svg" alt="" />
        <div class="app-header__user-info" *ngIf="user?.authenticated">
          <span (click)="logoutUser()"></span>
        </div>
      </div>
    </div>
  `,
  styleUrl: './app-header.component.scss',
})
export class AppHeaderComponent {
  @Input()
  user!: User | null;

  @Output()
  logout = new EventEmitter<any>();

  logoutUser(): void {
    this.logout.emit();
  }
}
