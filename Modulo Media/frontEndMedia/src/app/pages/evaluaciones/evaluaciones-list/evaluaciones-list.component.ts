import { Component, OnInit } from '@angular/core';
import { EvaluacionService } from '../../../services/evaluacion.service';
import { Evaluacion } from '../../../models/evaluacion.interface';

@Component({
  selector: 'app-evaluaciones-list',
  template: `
    <div class="container mx-auto p-4">
      <div class="flex justify-between items-center mb-6">
        <div class="flex items-center space-x-4">
          <a routerLink="/home" class="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700">
            Volver al Inicio
          </a>
          <h2 class="text-2xl font-bold">Evaluaciones</h2>
        </div>
        <a routerLink="nuevo" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Nueva Evaluación
        </a>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div *ngFor="let evaluacion of evaluaciones" 
             class="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
          <div class="flex justify-between items-start mb-2">
            <div>
              <h3 class="text-xl font-semibold">{{evaluacion.tipo}}</h3>
              <p class="text-gray-600">{{evaluacion.descripcion}}</p>
            </div>
            <span class="bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded">
              {{evaluacion.tiempoMinutos}} min
            </span>
          </div>
          
          <div class="flex gap-2 mb-2">
            <span class="bg-green-100 text-green-800 text-sm px-2 py-1 rounded">{{evaluacion.nivel}}</span>
            <span class="bg-purple-100 text-purple-800 text-sm px-2 py-1 rounded">{{evaluacion.asignatura}}</span>
          </div>

          <div class="flex items-center gap-2 text-sm text-gray-600 mb-4">
            <span class="flex items-center">
              <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"></path>
                <path fill-rule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clip-rule="evenodd"></path>
              </svg>
              {{evaluacion.tieneSolucionario ? 'Con solucionario' : 'Sin solucionario'}}
            </span>
          </div>

          <div class="flex justify-start items-center mt-4 space-x-4">
            <div class="space-x-2">
              <button *ngIf="evaluacion.idEvaluacion"
                      (click)="editarEvaluacion(evaluacion.idEvaluacion)" 
                      class="text-yellow-600 hover:text-yellow-800">
                Editar
              </button>
              <button *ngIf="evaluacion.idEvaluacion"
                      (click)="eliminarEvaluacion(evaluacion.idEvaluacion)" 
                      class="text-red-600 hover:text-red-800">
                Eliminar
              </button>
            </div>
            <a [href]="evaluacion.urlRecurso" target="_blank" 
               class="text-blue-600 hover:text-blue-800">
              Ver Evaluación
            </a>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class EvaluacionesListComponent implements OnInit {
  evaluaciones: Evaluacion[] = [];

  constructor(private evaluacionService: EvaluacionService) {}

  ngOnInit(): void {
    this.cargarEvaluaciones();
  }

  cargarEvaluaciones(): void {
    this.evaluacionService.getAllEvaluaciones()
      .subscribe(evaluaciones => this.evaluaciones = evaluaciones);
  }

  editarEvaluacion(id: number): void {
    // La navegación se maneja a través del routerLink
  }

  eliminarEvaluacion(id: number): void {
    if (confirm('¿Está seguro de que desea eliminar esta evaluación?')) {
      this.evaluacionService.deleteEvaluacion(id)
        .subscribe(() => {
          this.evaluaciones = this.evaluaciones.filter(e => e.idEvaluacion !== id);
        });
    }
  }
} 