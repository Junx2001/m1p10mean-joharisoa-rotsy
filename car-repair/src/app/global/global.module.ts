import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { httpInterceptorProviders } from './interceptors';
import { FooterAuthComponent } from './components/footer-auth/footer-auth.component';
import { LayoutComponent } from './components/layout/layout.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { AppRoutingModule } from '../app-routing.module';
import { UserDropdownComponent } from './components/user-dropdown/user-dropdown.component';



@NgModule({
  declarations: [
    LoginComponent,
    FooterAuthComponent,
    LayoutComponent,
    SidebarComponent,
    NavbarComponent,
    FooterComponent,
    HeaderComponent,
    UserDropdownComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AppRoutingModule
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
