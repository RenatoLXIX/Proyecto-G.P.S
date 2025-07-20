import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
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
    FormsModule,
    RouterModule.forChild(routes)
  ]
})
export class MaterialesModule { } 