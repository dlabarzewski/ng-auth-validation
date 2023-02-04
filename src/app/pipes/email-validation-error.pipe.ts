import { Pipe, PipeTransform } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Pipe({
  name: 'emailValidationError'
})
export class EmailValidationErrorPipe implements PipeTransform {

  transform(value: ValidationErrors | null | undefined): string {
    if (value === null || value === undefined) return '';

    if (value['required'] !== undefined) return 'Email is required';

    if (value['email'] !== undefined) return 'Please provide valid email address';

    return 'Email is invalid';
  }

}
