import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { httpInterceptorProviders } from './interceptors';
import { FooterAuthComponent } from './components/footer-auth/footer-auth.component';
import { LayoutComponent } from './components/layout/layout.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { UserDropdownComponent } from './components/user-dropdown/user-dropdown.component';
import { RouterModule } from '@angular/router';
import { LogoutComponent } from './components/logout/logout.component';
import { ListeLayoutComponent } from './components/liste-layout/liste-layout.component';
import { InfoVoitureComponent } from './components/info-voiture/info-voiture.component';
import * as fr from '@angular/common/locales/fr';


@NgModule({
  declarations: [
    LoginComponent,
    FooterAuthComponent,
    LayoutComponent,
    SidebarComponent,
    NavbarComponent,
    FooterComponent,
    HeaderComponent,
    UserDropdownComponent,
    LogoutComponent,
    ListeLayoutComponent,
    InfoVoitureComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ],
  providers: [
    {provide : LOCALE_ID, useValue: 'fr-FR'},
    httpInterceptorProviders
  ],
  exports:[
    LoginComponent,
    FooterAuthComponent,
    ListeLayoutComponent,
    InfoVoitureComponent
  ]
})
export class GlobalModule { 
  constructor(){
    registerLocaleData(fr.default);
  }
}
