import { NgModule } from '@angular/core';
import { CommonModule, DecimalPipe, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { CalificacionesListComponent } from './calificaciones-list/calificaciones-list.component';
import { CalificacionFormComponent } from './calificacion-form/calificacion-form.component';

const routes: Routes = [
  {
    path: '',
    component: CalificacionesListComponent
  },
  {
    path: 'nuevo',
    component: CalificacionFormComponent
  },
  {
    path: 'editar/:id',
    component: CalificacionFormComponent
  }
];

@NgModule({
  declarations: [
    CalificacionesListComponent,
    CalificacionFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class CalificacionesModule { } 