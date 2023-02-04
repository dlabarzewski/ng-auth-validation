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
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        passwordValidator,
      ]),
      confirmPassword: new FormControl(''),
    },
    { validators: passwordRepeatValidator }
  );

  onRegisterFormSubmitted(form: FormGroup): void {}
}
