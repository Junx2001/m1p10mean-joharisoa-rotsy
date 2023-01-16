import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LayoutComponent } from "../global/components/layout/layout.component";
import { AuthGuard } from "../global/guards/auth.guard";
import { DepotVoitureComponent } from "./depot-voiture/depot-voiture.component";
import { LoginClientComponent } from "./login-client/login-client.component";
import { RegisterComponent } from "./register/register.component";

const routes: Routes = [
    { path: 'login', component: LoginClientComponent},
    { path: 'register', component: RegisterComponent},
    { path: '',
    component: LayoutComponent,
    children:[
        { path: "depot-voiture", component: DepotVoitureComponent },
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