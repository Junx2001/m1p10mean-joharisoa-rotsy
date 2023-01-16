import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LayoutComponent } from "../global/components/layout/layout.component";
import { AuthGuard } from "../global/guards/auth.guard";
import { AjoutVoitureComponent } from "./ajout-voiture/ajout-voiture.component";
import { DepotVoitureComponent } from "./depot-voiture/depot-voiture.component";
import { ListeDepotsComponent } from "./liste-depots/liste-depots.component";
import { ListeVoituresComponent } from "./liste-voitures/liste-voitures.component";
import { LoginClientComponent } from "./login-client/login-client.component";
import { RegisterComponent } from "./register/register.component";

const routes: Routes = [
    { path: 'login', component: LoginClientComponent},
    { path: 'register', component: RegisterComponent},
    { path: '',
    component: LayoutComponent,
    children:[
        { path: "ajout-voiture", component: AjoutVoitureComponent },
        { path: "liste-voiture", component: ListeVoituresComponent },
        { path: "depot-voiture", component: DepotVoitureComponent },
        { path: "liste-voitures-deposees", component: ListeDepotsComponent },
        { path: "", redirectTo: "depot-voiture", pathMatch: "full" },
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