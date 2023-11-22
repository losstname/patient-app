import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {IndexComponent} from "./index/index.component";
import {CreateComponent} from "./create/create.component";
import {EditComponent} from "./edit/edit.component";

const routes: Routes = [
  {path: 'patient', redirectTo: 'patient/index', pathMatch: 'full'},
  {path: 'patient/index', component: IndexComponent},
  {path: 'patient/create', component: CreateComponent},
  {path: 'patient/:patientId/edit', component: EditComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatientRoutingModule { }
