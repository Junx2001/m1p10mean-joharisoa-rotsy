import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LayoutComponent } from "../global/components/layout/layout.component";
import { AuthGuard } from "../global/guards/auth.guard";
import { LoginAtelierComponent } from "./login-atelier/login-atelier.component";
import { NonRecupereComponent } from "./non-recupere/non-recupere.component";
import { PdfBonDeSortieComponent } from "./pdf-bon-de-sortie/pdf-bon-de-sortie.component";
import { ReceptionComponent } from "./reception/reception.component";
import { ReparationDetailsComponent } from "./reparation-details/reparation-details.component";
import { ReparerVoitureComponent } from "./reparer-voiture/reparer-voiture.component";
import { VoituresAtelierComponent } from "./voitures-atelier/voitures-atelier.component";

const routes: Routes = [
    { path: 'login', component: LoginAtelierComponent},
    { path: '',
    component: LayoutComponent,
    children:[
        { path: "voitures-dans-le-garage", component: VoituresAtelierComponent },
        { path: 'exportBonDeSortiePDF/:immatriculation', component: PdfBonDeSortieComponent },
        { path: "sortie-non-recuperees", component: NonRecupereComponent },
        { path: "reparer-voiture/:reparationId", component: ReparerVoitureComponent },
        { path: "reception-voiture", component: ReceptionComponent },
        { path: "reparation-details/:reparationId", component: ReparationDetailsComponent },
        { path: "", redirectTo: "reception-voiture", pathMatch: "full" },
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
export class AtelierRoutingModule{}