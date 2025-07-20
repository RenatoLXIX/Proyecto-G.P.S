import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { CursosListComponent } from './cursos-list/cursos-list.component';
import { CursoFormComponent } from './curso-form/curso-form.component';

const routes: Routes = [
  {
    path: '',
    component: CursosListComponent
  },
  {
    path: 'nuevo',
    component: CursoFormComponent
  },
  {
    path: 'editar/:id',
    component: CursoFormComponent
  }
];

@NgModule({
  declarations: [
    CursosListComponent,
    CursoFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class CursosModule { } 