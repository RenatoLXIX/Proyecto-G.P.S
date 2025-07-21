import { Component, OnInit } from '@angular/core';
import { EvaluacionService } from '../../../services/evaluacion.service';
import { Evaluacion } from '../../../models/evaluacion.interface';
import { Router } from '@angular/router';
import { RoleService } from '../../../services/role.service';
import { UserType } from '../../../models/user-type.model';

@Component({
  selector: 'app-evaluaciones-list',
  template: `
    <div class="container mx-auto p-4">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-2xl font-bold">Evaluaciones</h2>
        <a routerLink="/home" class="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700">
          Volver al Inicio
        </a>
      </div>

      <div class="mb-6">
        <a *ngIf="canCreate()" routerLink="nuevo" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Nueva Evaluación
        </a>
      </div>

      <div *ngIf="evaluaciones.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div *ngFor="let evaluacion of evaluaciones" 
             class="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 border border-gray-100 min-h-[280px] flex flex-col">
          <div class="flex-grow">
            <div class="flex justify-between items-start mb-3">
              <h3 class="text-xl font-bold text-gray-800">{{evaluacion.tipo}}</h3>
              <span class="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full font-medium">
                {{evaluacion.tiempoMinutos}} min
              </span>
            </div>
            <p class="text-gray-600 mb-4 line-clamp-3">{{evaluacion.descripcion}}</p>
            
            <div class="flex flex-wrap gap-2 mb-4">
              <span class="bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full font-medium">{{evaluacion.nivel}}</span>
              <span class="bg-purple-100 text-purple-800 text-sm px-3 py-1 rounded-full font-medium">{{evaluacion.asignatura}}</span>
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
          </div>

          <div class="mt-auto pt-4 border-t border-gray-100">
            <div class="flex justify-between items-center">
              <div class="space-x-2">
                <button *ngIf="evaluacion.idEvaluacion && canCreate()"
                        (click)="editarEvaluacion(evaluacion.idEvaluacion)" 
                        class="text-yellow-600 hover:text-yellow-800 font-medium text-sm">
                  Editar
                </button>
                <button *ngIf="evaluacion.idEvaluacion && canCreate()"
                        (click)="eliminarEvaluacion(evaluacion.idEvaluacion)" 
                        class="text-red-600 hover:text-red-800 font-medium text-sm">
                  Eliminar
                </button>
              </div>
              <a [href]="evaluacion.urlRecurso" target="_blank" 
                 class="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm font-medium">
                Ver Evaluación
              </a>
            </div>
          </div>
        </div>
      </div>

      <div *ngIf="evaluaciones.length === 0" class="text-center py-12">
        <div class="bg-gray-50 rounded-xl p-8 border-2 border-dashed border-gray-300">
          <svg class="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
          </svg>
          <h3 class="text-lg font-medium text-gray-900 mb-2">No hay evaluaciones disponibles</h3>
          <p class="text-gray-500 mb-4">Aún no se han creado evaluaciones en esta sección.</p>
          <a *ngIf="canCreate()" routerLink="nuevo" class="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
            </svg>
            Crear primera evaluación
          </a>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class EvaluacionesListComponent implements OnInit {
  evaluaciones: Evaluacion[] = [];
  userType?: UserType;

  constructor(
    private evaluacionService: EvaluacionService,
    private roleService: RoleService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarEvaluaciones();
    this.roleService.selectedRole$.subscribe(role => {
      this.userType = role;
    });
  }

  canCreate(): boolean {
    return this.userType === UserType.ADMINISTRADOR || this.userType === UserType.PROFESOR;
  }

  cargarEvaluaciones(): void {
    this.evaluacionService.getAllEvaluaciones()
      .subscribe(evaluaciones => this.evaluaciones = evaluaciones);
  }

  editarEvaluacion(id: number): void {
    this.router.navigate(['/evaluaciones/editar', id]);
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