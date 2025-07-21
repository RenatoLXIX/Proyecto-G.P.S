import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialesListComponent } from './materiales-list/materiales-list.component';
import { MaterialFormComponent } from './material-form/material-form.component';

const routes: Routes = [
  { path: '', component: MaterialesListComponent },
  { path: 'nuevo', component: MaterialFormComponent },
  { path: 'editar/:id', component: MaterialFormComponent }
];

@NgModule({
  declarations: [
    MaterialesListComponent,
    MaterialFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class MaterialesModule { } 