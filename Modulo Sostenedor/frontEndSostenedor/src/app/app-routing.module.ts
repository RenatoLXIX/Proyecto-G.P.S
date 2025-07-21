import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: AppComponent },
  { path: 'reportes', component: AppComponent },
  { path: 'estado', component: AppComponent },
  { path: 'busqueda', component: AppComponent },
  { path: 'mensajeria', component: AppComponent },
  // Nuevas rutas para los módulos educativos
  { path: 'kinder', component: AppComponent },
  { path: 'basica', component: AppComponent },
  { path: 'media', component: AppComponent },
  // Ruta comodín para manejar URLs no encontradas
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }