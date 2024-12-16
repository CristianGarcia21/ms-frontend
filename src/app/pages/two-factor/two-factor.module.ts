import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TwoFactorRoutingModule } from './two-factor-routing.module';
import { FormularioComponent } from './formulario/formulario.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    FormularioComponent
  ],
  imports: [
    CommonModule,
    TwoFactorRoutingModule,
    FormsModule
  ]
})
export class TwoFactorModule { }
