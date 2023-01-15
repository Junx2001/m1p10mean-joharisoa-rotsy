import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginClientComponent } from './login-client/login-client.component';
import { ClientRoutingModule } from './client-routing.module';
import { GlobalModule } from '../global/global.module';
import { RegisterComponent } from './register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DepotVoitureComponent } from './depot-voiture/depot-voiture.component';



@NgModule({
  declarations: [
    LoginClientComponent,
    RegisterComponent,
    DepotVoitureComponent,
  ],
  imports: [
    CommonModule,
    ClientRoutingModule,
    GlobalModule,
    ReactiveFormsModule
  ],
  exports: [
    LoginClientComponent
  ]
})
export class ClientModule { }
