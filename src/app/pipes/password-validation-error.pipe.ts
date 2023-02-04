import { Pipe, PipeTransform } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Pipe({
  name: 'passwordValidationError'
})
export class PasswordValidationErrorPipe implements PipeTransform {

  transform(value: ValidationErrors | null | undefined): string {
    if (value === null || value === undefined) return '';

    if (value['required'] !== undefined) return 'Password is required';

    if (value['minlength'] !== undefined) return 'Password must have minimum 6 characters';

    if (value['smallCharacter'] !== undefined) return 'Password must have minimum 1 small character';

    if (value['capitalCharacter'] !== undefined) return 'Password must have minimum 1 capital character';

    if (value['numberCharacter'] !== undefined) return 'Password must have minimum 1 number character';

    if (value['specialCharacter'] !== undefined) return 'Password must have minimum 1 special character: @#$%^*()';

    return 'Password is invalid';
  }

}
