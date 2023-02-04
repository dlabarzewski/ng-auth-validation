import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';

export const passwordValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const value = control.value as string;

  const errors: { [key: string]: boolean } = {};

  if (!value.match(/[a-z]/)) {
    errors['smallCharacter'] = true;
  }

  if (!value.match(/[A-Z]/)) {
    errors['capitalCharacter'] = true;
  }

  if (!value.match(/\d/)) {
    errors['numberCharacter'] = true;
  }

  if (!value.match(/[@#$%^*()]/)) {
    errors['specialCharacter'] = true;
  }

  if (Object.keys(errors).length) {
    return errors;
  }

  return null;
};

export const passwordRepeatValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const password = control.get('password')?.value;
  const confirmPassword = control.get('confirmPassword');
  const confirmPasswordValue = confirmPassword?.value;

  if (password !== confirmPasswordValue) {
    confirmPassword?.setErrors({ valid: false });

    return {
      confirmPassword: true,
    };
  }

  confirmPassword?.setErrors(null);

  return null;
};

export const dateOfBirthValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {

  const day = control.get('day');
  const month = control.get('month');
  const year = control.get('year');

  if (day?.invalid || month?.invalid || year?.invalid) return null;

  const dayValue = parseInt(day?.value);
  const monthValue = parseInt(month?.value);
  const yearValue = parseInt(year?.value);

  if (isNaN(dayValue) || isNaN(monthValue) || isNaN(yearValue)) return null;

  const daysMap: { [key: number]: number } = {
    1: 31,
    2: 28,
    3: 31,
    4: 30,
    5: 31,
    6: 30,
    7: 31,
    8: 31,
    9: 30,
    10: 31,
    11: 30,
    12: 31
  }

  if (yearValue % 4 === 0) {
    daysMap[2] = 29;
  }

  if (dayValue > daysMap[monthValue]) {
    return {
      maxDay: daysMap[monthValue]
    }
  }

  return null;
};

@Component({
  selector: 'app-authentication-register-validation',
  styleUrls: ['./authentication-register-validation.component.scss'],
  templateUrl: './authentication-register-validation.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthenticationRegisterValidationComponent {
  readonly form: FormGroup = new FormGroup(
    {
      email: new FormControl('', [Validators.required, Validators.email]),
      dateOfBirth: new FormGroup(
        {
          day: new FormControl('', [
            Validators.required,
          ]),
          month: new FormControl('', [
            Validators.required,
          ]),
          year: new FormControl('', [
            Validators.required,
          ]),
        },
        { validators: dateOfBirthValidator }
      ),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        passwordValidator,
      ]),
      confirmPassword: new FormControl(''),
    },
    { validators: passwordRepeatValidator }
  );

  getMinYear() {
    return new Date().getFullYear() - 100;
  }

  getMaxYear() {
    return new Date().getFullYear();
  }

  onRegisterFormSubmitted(form: FormGroup): void {}
}
