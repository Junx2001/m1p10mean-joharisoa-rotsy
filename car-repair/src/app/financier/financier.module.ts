import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginFinancierComponent } from './login-financier/login-financier.component';
import { FinancierRoutingModule } from './financier-route.module';
import { GlobalModule } from '../global/global.module';
import { DepensesComponent } from './depenses/depenses.component';
import { FacturesNonPayeesComponent } from './factures-non-payees/factures-non-payees.component';
import { DetailsFactureComponent } from './details-facture/details-facture.component';
import { StatistiquesComponent } from './statistiques/statistiques.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LineChartComponent } from './line-chart/line-chart.component';
import { LineChartJourComponent } from './line-chart-jour/line-chart-jour.component';
import { StatDepensesComponent } from './stat-depenses/stat-depenses.component';
import { NgxPaginationModule } from 'ngx-pagination';



@NgModule({
  declarations: [
    LoginFinancierComponent,
    DepensesComponent,
    FacturesNonPayeesComponent,
    DetailsFactureComponent,
    StatistiquesComponent,
    LineChartComponent,
    LineChartJourComponent,
    StatDepensesComponent
  ],
  imports: [
    CommonModule,
    FinancierRoutingModule,
    GlobalModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ]
})
export class FinancierModule { }
