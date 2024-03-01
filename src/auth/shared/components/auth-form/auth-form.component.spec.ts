import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthFormComponent } from './auth-form.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';

describe('AuthFormComponent', () => {
  let component: AuthFormComponent;
  let fixture: ComponentFixture<AuthFormComponent>;
  let el: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AuthFormComponent);
    component = fixture.componentInstance;
    el = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a form with two input elements', () => {
    const formElement = el.querySelector('#form');
    const inputElements = formElement?.querySelectorAll('input');
    expect(inputElements?.length).toEqual(2);
  });

  it('should have empty initial values', () => {
    const form = component.form;
    const formValues = {
      email: '',
      password: '',
    };
    expect(form.value).toEqual(formValues);
  });

  it('should check email value after entring some value and validation', async () => {
    const formElement = el.querySelector('#form');
    const emailElement = formElement?.querySelectorAll(
      'input'
    )[0] as HTMLInputElement;
    const emailFormControl = component.form.get('email') as FormControl;

    expect(emailElement?.value).toEqual(emailFormControl?.value);
    emailElement.value = 'email';
    emailElement.dispatchEvent(new Event('input'));

    fixture.detectChanges();
    await fixture.whenStable();

    expect(emailFormControl.errors).not.toBeNull();
    expect(emailFormControl?.hasError('email')).toBeTruthy();
  });

  it('should check passowrd value before entring some value and validation', () => {
    const formElement = el.querySelector('#form');
    const passowrdElement = formElement?.querySelectorAll(
      'input'
    )[1] as HTMLInputElement;
    const passwordFormControl = component.form.get('password') as FormControl;

    expect(passowrdElement?.value).toEqual(passwordFormControl?.value);
    expect(passwordFormControl.errors).not.toBeNull();
    expect(passwordFormControl?.hasError('required')).toBeTruthy();
  });

  it('should call the output on emit when form is valid', async () => {
    spyOn(component.submitted, 'emit').and.callThrough();

    const formElement = el.querySelector('#form');
    const emailElement = formElement?.querySelectorAll(
      'input'
    )[0] as HTMLInputElement;
    const passwordElement = formElement?.querySelectorAll(
      'input'
    )[1] as HTMLInputElement;

    emailElement.value = 'username@email.com';
    passwordElement.value = '12345';
    emailElement.dispatchEvent(new Event('input'));
    passwordElement.dispatchEvent(new Event('input'));

    fixture.detectChanges();
    await fixture.whenStable();

    component.onSubmit();
    expect(component.submitted.emit).toHaveBeenCalledWith(component.form);
  });
});
