import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkoutTypeComponent } from './workout-type.component';

describe('WorkoutTypeComponent', () => {
  let component: WorkoutTypeComponent;
  let fixture: ComponentFixture<WorkoutTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkoutTypeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WorkoutTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
