import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { LoginClientComponent } from './login-client/login-client.component';
import { ClientRoutingModule } from './client-routing.module';
import { GlobalModule } from '../global/global.module';
import { RegisterComponent } from './register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DepotVoitureComponent } from './depot-voiture/depot-voiture.component';
import { AjoutVoitureComponent } from './ajout-voiture/ajout-voiture.component';
import { ListeVoituresComponent } from './liste-voitures/liste-voitures.component';
import { RecuperationVoitureComponent } from './recuperation-voiture/recuperation-voiture.component';
import { ListeReparationsComponent } from './liste-reparations/liste-reparations.component';
import { ListeFacturesComponent } from './liste-factures/liste-factures.component';
import { PaiementComponent } from './paiement/paiement.component';
import { HistoriqueComponent } from './historique/historique.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ActivateUserAccountComponent } from './activate-user-account/activate-user-account.component';
import { PdfFactureComponent } from './pdf-facture/pdf-facture.component';
import { FicheVoitureComponent } from './fiche-voiture/fiche-voiture.component';

@NgModule({
  declarations: [
    LoginClientComponent,
    RegisterComponent,
    DepotVoitureComponent,
    AjoutVoitureComponent,
    ListeVoituresComponent,
    RecuperationVoitureComponent,
    ListeReparationsComponent,
    ListeFacturesComponent,
    PaiementComponent,
    HistoriqueComponent,
    ActivateUserAccountComponent,
    PdfFactureComponent,
    FicheVoitureComponent,
  ],
  imports: [
    CommonModule,
    ClientRoutingModule,
    GlobalModule,
    ReactiveFormsModule,
    DragDropModule
  ],
  providers:[
    CurrencyPipe
  ],
  exports: [
    LoginClientComponent
  ]
})
export class ClientModule { }
