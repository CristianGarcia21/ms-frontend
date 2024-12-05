import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MunicipalityRoutingModule } from './municipality-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ManageComponent } from './manage/manage.component';
import { ListComponent } from './list/list.component';


@NgModule({
  declarations: [
    ManageComponent,
    ListComponent
  ],
  imports: [
    CommonModule,
    MunicipalityRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class MunicipalityModule { }
