import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentDashboardComponent } from './pages/student-dashboard/student-dashboard.component';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  {
    path: 'materiales',
    loadChildren: () => import('./pages/materiales/materiales.module').then(m => m.MaterialesModule)
  },
  {
    path: 'evaluaciones',
    loadChildren: () => import('./pages/evaluaciones/evaluaciones.module').then(m => m.EvaluacionesModule)
  },
  {
    path: 'planificaciones',
    loadChildren: () => import('./pages/planificaciones/planificaciones.module').then(m => m.PlanificacionesModule)
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'student-dashboard',
    component: StudentDashboardComponent
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
