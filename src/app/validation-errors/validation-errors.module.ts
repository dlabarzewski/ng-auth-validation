import { NgModule } from '@angular/core';
import { EmailValidationErrorPipe } from '../pipes/email-validation-error.pipe';
import { PasswordValidationErrorPipe } from '../pipes/password-validation-error.pipe';

@NgModule({
  imports: [],
  declarations: [EmailValidationErrorPipe, PasswordValidationErrorPipe],
  exports: [EmailValidationErrorPipe, PasswordValidationErrorPipe],
})
export class ValidationErrorsModule { }
