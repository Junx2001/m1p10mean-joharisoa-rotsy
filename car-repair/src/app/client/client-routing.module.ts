import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LayoutComponent } from "../global/components/layout/layout.component";
import { AuthGuard } from "../global/guards/auth.guard";
import { AjoutVoitureComponent } from "./ajout-voiture/ajout-voiture.component";
import { DepotVoitureComponent } from "./depot-voiture/depot-voiture.component";
import { HistoriqueComponent } from "./historique/historique.component";
import { ListeFacturesComponent } from "./liste-factures/liste-factures.component";
import { ListeReparationsComponent } from "./liste-reparations/liste-reparations.component";
import { ListeVoituresComponent } from "./liste-voitures/liste-voitures.component";
import { LoginClientComponent } from "./login-client/login-client.component";
import { PaiementComponent } from "./paiement/paiement.component";
import { RecuperationVoitureComponent } from "./recuperation-voiture/recuperation-voiture.component";
import { RegisterComponent } from "./register/register.component";

const routes: Routes = [
    { path: 'login', component: LoginClientComponent},
    { path: 'register', component: RegisterComponent},
    { path: '',
    component: LayoutComponent,
    children:[
        { path: "paiement", component: PaiementComponent },
        { path: "ajout-voiture", component: AjoutVoitureComponent },
        { path: "liste-voitures", component: ListeVoituresComponent },
        { path: 'historique-reparations/:immatriculation', component: HistoriqueComponent },
        { path: 'reparations/:immatriculation', component: ListeReparationsComponent },
        { path: 'factures/:immatriculation', component: ListeFacturesComponent },
        { path: "depot-voiture", component: DepotVoitureComponent },
        { path: "recuperation-voiture", component: RecuperationVoitureComponent },
        { path: "", redirectTo: "liste-voitures", pathMatch: "full" },
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