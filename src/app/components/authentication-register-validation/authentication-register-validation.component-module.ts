import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { AuthenticationRegisterValidationComponent } from './authentication-register-validation.component';
import { ValidationErrorsModule } from 'src/app/validation-errors/validation-errors.module';

@NgModule({
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, CommonModule, MatButtonModule, MatTabsModule, MatCardModule, ValidationErrorsModule],
  declarations: [AuthenticationRegisterValidationComponent],
  providers: [],
  exports: [AuthenticationRegisterValidationComponent]
})
export class AuthenticationRegisterValidationComponentModule {
}
