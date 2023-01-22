import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LayoutComponent } from "../global/components/layout/layout.component";
import { AuthGuard } from "../global/guards/auth.guard";
import { DepensesComponent } from "./depenses/depenses.component";
import { DetailsFactureComponent } from "./details-facture/details-facture.component";
import { FacturesNonPayeesComponent } from "./factures-non-payees/factures-non-payees.component";
import { LoginFinancierComponent } from "./login-financier/login-financier.component";
import { StatistiquesComponent } from "./statistiques/statistiques.component";

const routes: Routes = [
    { path: 'login', component: LoginFinancierComponent},
    { path: '',
    component: LayoutComponent,
    children:[
        { path: "factures-non-payees", component: FacturesNonPayeesComponent },
        { path: "factures-non-payees/:reparationId", component: DetailsFactureComponent },
        { path: "insertion-depenses", component: DepensesComponent },
        { path: "statistiques", component: StatistiquesComponent },
        { path: "", redirectTo: "factures-non-payees", pathMatch: "full" },
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
export class FinancierRoutingModule{}