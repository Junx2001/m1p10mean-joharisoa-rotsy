import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LayoutComponent } from "../global/components/layout/layout.component";
import { AuthGuard } from "../global/guards/auth.guard";
import { ActivateUserAccountComponent } from "./activate-user-account/activate-user-account.component";
import { AjoutVoitureComponent } from "./ajout-voiture/ajout-voiture.component";
import { DepotVoitureComponent } from "./depot-voiture/depot-voiture.component";
import { FicheVoitureComponent } from "./fiche-voiture/fiche-voiture.component";
import { HistoriqueComponent } from "./historique/historique.component";
import { ListeFacturesComponent } from "./liste-factures/liste-factures.component";
import { ListeReparationsComponent } from "./liste-reparations/liste-reparations.component";
import { ListeVoituresComponent } from "./liste-voitures/liste-voitures.component";
import { LoginClientComponent } from "./login-client/login-client.component";
import { PaiementComponent } from "./paiement/paiement.component";
import { PdfFactureComponent } from "./pdf-facture/pdf-facture.component";
import { RecuperationVoitureComponent } from "./recuperation-voiture/recuperation-voiture.component";
import { RegisterComponent } from "./register/register.component";

const routes: Routes = [
    { path: 'login', component: LoginClientComponent},
    { path: 'login/:activatedAccount', component: LoginClientComponent},
    { path: 'activateAccount/:userId/:secretEmailToken', component: ActivateUserAccountComponent },
    { path: 'register', component: RegisterComponent},
    { path: 'exportFacturePDF/:immatriculation', component: PdfFactureComponent,canActivate:[AuthGuard] },
    { path: '',
    component: LayoutComponent,
    children:[
        { path: "paiement", component: PaiementComponent },
        { path: "paiement/:reparationId", component: PaiementComponent },
        { path: "ajout-voiture", component: AjoutVoitureComponent },
        { path: "voitures", component: ListeVoituresComponent },
        { path: "voitures/:immatriculation", component: FicheVoitureComponent },
        { path: 'historique-reparations/:immatriculation', component: HistoriqueComponent },
        { path: 'reparations/:immatriculation', component: ListeReparationsComponent },
        { path: 'factures/:immatriculation', component: ListeFacturesComponent },
        { path: "depot-voiture", component: DepotVoitureComponent },
        { path: "recuperation-voiture", component: RecuperationVoitureComponent },
        { path: "", redirectTo: "voitures", pathMatch: "full" },
    ],
    canActivate:[AuthGuard]},
  ];
@NgModule({
    imports : [
        RouterModule.forChild(routes)
    ],
    exports : [
        RouterModule
    ]
})
export class ClientRoutingModule{}