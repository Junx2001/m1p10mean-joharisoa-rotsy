import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginAtelierComponent } from './login-atelier/login-atelier.component';
import { AtelierRoutingModule } from './atelier-route.module';
import { GlobalModule } from '../global/global.module';
import { ReactiveFormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ReceptionComponent } from './reception/reception.component';
import { VoituresAtelierComponent } from './voitures-atelier/voitures-atelier.component';
import { ReparerVoitureComponent } from './reparer-voiture/reparer-voiture.component';



@NgModule({
  declarations: [
    LoginAtelierComponent,
    ReceptionComponent,
    VoituresAtelierComponent,
    ReparerVoitureComponent
  ],
  imports: [
    CommonModule,
    AtelierRoutingModule,
    GlobalModule,
    ReactiveFormsModule,
    DragDropModule
  ]
})
export class AtelierModule { }
