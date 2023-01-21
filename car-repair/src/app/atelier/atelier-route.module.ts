import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginAtelierComponent } from "./login-atelier/login-atelier.component";

const routes: Routes = [
    { path: 'login', component: LoginAtelierComponent},
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