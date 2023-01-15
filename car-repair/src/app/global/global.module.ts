import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { httpInterceptorProviders } from './interceptors';
import { FooterAuthComponent } from './components/footer-auth/footer-auth.component';



@NgModule({
  declarations: [
    LoginComponent,
    FooterAuthComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  providers: [
    httpInterceptorProviders
  ],
  exports:[
    LoginComponent,
    FooterAuthComponent
  ]
})
export class GlobalModule { }
