import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginAtelierComponent } from './login-atelier/login-atelier.component';
import { AtelierRoutingModule } from './atelier-route.module';
import { GlobalModule } from '../global/global.module';
import { ReactiveFormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';



@NgModule({
  declarations: [
    LoginAtelierComponent
  ],
  imports: [
    CommonModule,
    AtelierRoutingModule,
    GlobalModule,
    ReactiveFormsModule,
    DragDropModule
  ]
})
export class AtelierModule { }
