import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VehicleDriversRoutingModule } from './vehicle-drivers-routing.module';
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
    VehicleDriversRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class VehicleDriversModule { }
