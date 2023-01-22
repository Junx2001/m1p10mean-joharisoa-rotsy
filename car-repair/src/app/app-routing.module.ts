import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogoutComponent } from './global/components/logout/logout.component';

const routes: Routes = [
      { path: '', loadChildren: () => import('./client/client.module').then(m => m.ClientModule) },
      { path: 'atelier', loadChildren: () => import('./atelier/atelier.module').then(m => m.AtelierModule) },
      { path: 'finance', loadChildren: () => import('./financier/financier.module').then(m => m.FinancierModule) },
      { path: 'logout', component : LogoutComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
