import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageComponent } from '../clients/manage/manage.component';
import { ListComponent } from './list/list.component';

const routes: Routes = [
  {path:'list', component: ListComponent},
  {path:'create', component: ManageComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OperationsRoutingModule { }
