import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginClientComponent } from "./login-client/login-client.component";
import { RegisterComponent } from "./register/register.component";

const routes: Routes = [
    { path: 'login', component: LoginClientComponent},
    { path: 'register', component: RegisterComponent},
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