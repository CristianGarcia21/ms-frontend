import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StagesRoutingModule } from './stages-routing.module';
import { ManageComponent } from './manage/manage.component';
import { ListComponent } from './list/list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ManageComponent,
    ListComponent
  ],
  imports: [
    CommonModule,
    StagesRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class StagesModule { }
