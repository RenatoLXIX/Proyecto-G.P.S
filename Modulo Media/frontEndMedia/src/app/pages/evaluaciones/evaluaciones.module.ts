import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { EvaluacionesListComponent } from './evaluaciones-list/evaluaciones-list.component';
import { EvaluacionFormComponent } from './evaluacion-form/evaluacion-form.component';

const routes: Routes = [
  { path: '', component: EvaluacionesListComponent },
  { path: 'nuevo', component: EvaluacionFormComponent },
  { path: 'editar/:id', component: EvaluacionFormComponent }
];

@NgModule({
  declarations: [
    EvaluacionesListComponent,
    EvaluacionFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class EvaluacionesModule { } 