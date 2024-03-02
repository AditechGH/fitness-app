import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl } from '@angular/forms';

import { AuthFormComponent } from './auth-form.component';

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

  it('should check email value after entering some value and validation', async () => {
    const formElement = el.querySelector('#form');
    const emailElement = formElement?.querySelectorAll(
      'input'
    )[0] as HTMLInputElement;
    const emailFormControl = component.form.get('email') as FormControl;

    expect(emailElement?.value).toEqual(emailFormControl?.value);
    emailElement.value = 'email';
    emailFormControl.markAsTouched();
    emailElement.dispatchEvent(new Event('input'));

    fixture.detectChanges();
    await fixture.whenStable();

    expect(component.emailFormat).toBeTruthy();
  });

  it('should check password value before entering some value and validation', () => {
    const formElement = el.querySelector('#form');
    const passwordElement = formElement?.querySelectorAll(
      'input'
    )[1] as HTMLInputElement;
    const passwordFormControl = component.form.get('password') as FormControl;

    expect(passwordElement?.value).toEqual(passwordFormControl?.value);
    passwordFormControl.markAsTouched();

    expect(component.passwordInvalid).toBeTruthy();
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
