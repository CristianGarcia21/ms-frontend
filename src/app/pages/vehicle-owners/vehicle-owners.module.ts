import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VehicleOwnersRoutingModule } from './vehicle-owners-routing.module';
import { ListComponent } from './list/list.component';
import { ManageComponent } from './manage/manage.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ListComponent,
    ManageComponent
  ],
  imports: [
    CommonModule,
    VehicleOwnersRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class VehicleOwnersModule { }
