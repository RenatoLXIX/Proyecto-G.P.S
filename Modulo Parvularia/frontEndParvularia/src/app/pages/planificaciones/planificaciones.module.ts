import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { PlanificacionesListComponent } from './planificaciones-list/planificaciones-list.component';
import { PlanificacionFormComponent } from './planificacion-form/planificacion-form.component';

const routes: Routes = [
  { path: '', component: PlanificacionesListComponent },
  { path: 'nuevo', component: PlanificacionFormComponent },
  { path: 'editar/:id', component: PlanificacionFormComponent },
  { path: 'detalle/:id', component: PlanificacionFormComponent, data: { readOnly: true } }
];

@NgModule({
  declarations: [
    PlanificacionesListComponent,
    PlanificacionFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild(routes)
  ]
})
export class PlanificacionesModule { } 