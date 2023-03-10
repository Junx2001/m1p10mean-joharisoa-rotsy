import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginAtelierComponent } from './login-atelier/login-atelier.component';
import { AtelierRoutingModule } from './atelier-route.module';
import { GlobalModule } from '../global/global.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ReceptionComponent } from './reception/reception.component';
import { VoituresAtelierComponent } from './voitures-atelier/voitures-atelier.component';
import { ReparerVoitureComponent } from './reparer-voiture/reparer-voiture.component';
import { ReparationDetailsComponent } from './reparation-details/reparation-details.component';
import { NonRecupereComponent } from './non-recupere/non-recupere.component';
import { PdfBonDeSortieComponent } from './pdf-bon-de-sortie/pdf-bon-de-sortie.component';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [
    LoginAtelierComponent,
    ReceptionComponent,
    VoituresAtelierComponent,
    ReparerVoitureComponent,
    ReparationDetailsComponent,
    NonRecupereComponent,
    PdfBonDeSortieComponent
  ],
  imports: [
    CommonModule,
    AtelierRoutingModule,
    GlobalModule,
    ReactiveFormsModule,
    DragDropModule,
    FormsModule,
    NgxPaginationModule
  ]
})
export class AtelierModule { }
