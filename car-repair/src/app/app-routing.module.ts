import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogoutComponent } from './global/components/logout/logout.component';

const routes: Routes = [
      { path: '', loadChildren: () => import('./client/client.module').then(m => m.ClientModule) },
      { path: 'logout', component : LogoutComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
