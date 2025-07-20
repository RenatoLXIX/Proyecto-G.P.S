import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'materiales', loadChildren: () => import('./pages/materiales/materiales.module').then(m => m.MaterialesModule) },
  { path: 'planificaciones', loadChildren: () => import('./pages/planificaciones/planificaciones.module').then(m => m.PlanificacionesModule) },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
