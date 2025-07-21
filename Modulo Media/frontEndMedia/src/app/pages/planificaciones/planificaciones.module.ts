import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { PlanificacionesListComponent } from './planificaciones-list/planificaciones-list.component';
import { PlanificacionFormComponent } from './planificacion-form/planificacion-form.component';

const routes: Routes = [
  { path: '', component: PlanificacionesListComponent },
  { path: 'nuevo', component: PlanificacionFormComponent },
  { path: 'editar/:id', component: PlanificacionFormComponent }
];

@NgModule({
  declarations: [
    PlanificacionesListComponent,
    PlanificacionFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class PlanificacionesModule { } 