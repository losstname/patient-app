import { Routes } from '@angular/router';
import {IndexComponent} from "./patient/index/index.component";
import {CreateComponent} from "./patient/create/create.component";
import {EditComponent} from "./patient/edit/edit.component";

export const routes: Routes = [
  { path: '', redirectTo: 'patient', pathMatch: 'full' },
  { path: 'patient', component: IndexComponent },
  { path: 'patient/index', component: IndexComponent},
  { path: 'patient/create', component: CreateComponent},
  { path: 'patient/:patientId/edit', component: EditComponent}
];
