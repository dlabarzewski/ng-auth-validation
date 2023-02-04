import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthenticationRegisterValidationComponent } from './components/authentication-register-validation/authentication-register-validation.component';
import { AuthenticationRegisterValidationComponentModule } from './components/authentication-register-validation/authentication-register-validation.component-module';

@NgModule({
  imports: [RouterModule.forRoot([{ path: 'auth-single-page', component: AuthenticationRegisterValidationComponent }]), AuthenticationRegisterValidationComponentModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
