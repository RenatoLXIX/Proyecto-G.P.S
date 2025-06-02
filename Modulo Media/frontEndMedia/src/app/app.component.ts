import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <nav class="bg-blue-600 text-white p-4">
      <div class="container mx-auto flex justify-between items-center">
        <h1 class="text-xl font-bold">Módulo Media</h1>
        <div class="space-x-4">
          <a routerLink="/materiales" routerLinkActive="text-blue-200" class="hover:text-blue-200">
            Materiales
          </a>
          <a routerLink="/evaluaciones" routerLinkActive="text-blue-200" class="hover:text-blue-200">
            Evaluaciones
          </a>
          <a routerLink="/planificaciones" routerLinkActive="text-blue-200" class="hover:text-blue-200">
            Planificaciones
          </a>
        </div>
      </div>
    </nav>
    <main class="container mx-auto p-4">
      <router-outlet></router-outlet>
    </main>
  `,
  styles: []
})
export class AppComponent {
  title = 'Módulo Media';
}
