import { Component, OnInit } from '@angular/core';
import { PlanificacionService } from '../../../services/planificacion.service';
import { Planificacion } from '../../../models/planificacion.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-planificaciones-list',
  template: `
    <div class="container mx-auto p-4">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-2xl font-bold">Planificaciones Parvularia</h2>
        <a routerLink="/home" class="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700">
          Volver al Inicio
        </a>
      </div>

      <!-- Filtros -->
      <div class="mb-6 bg-white rounded-lg shadow-md p-4">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Nivel</label>
            <select [(ngModel)]="filtroNivel" (change)="aplicarFiltros()" class="w-full border border-gray-300 rounded-md px-3 py-2">
              <option value="">Todos los niveles</option>
              <option value="MEDIO_MENOR">Medio Menor</option>
              <option value="MEDIO_MAYOR">Medio Mayor</option>
              <option value="PRE_KINDER">Pre-Kinder</option>
              <option value="KINDER">Kinder</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Tipo</label>
            <select [(ngModel)]="filtroTipo" (change)="aplicarFiltros()" class="w-full border border-gray-300 rounded-md px-3 py-2">
              <option value="">Todos los tipos</option>
              <option value="ANUAL">Anual</option>
              <option value="CLASE_A_CLASE">Clase a Clase</option>
              <option value="RUTINA_DIARIA">Rutina Diaria</option>
              <option value="ACTIVIDAD_VARIABLE">Actividad Variable</option>
              <option value="RECREO_DIRIGIDO">Recreo Dirigido</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Área</label>
            <select [(ngModel)]="filtroArea" (change)="aplicarFiltros()" class="w-full border border-gray-300 rounded-md px-3 py-2">
              <option value="">Todas las áreas</option>
              <option value="LENGUAJE">Lenguaje</option>
              <option value="MATEMATICAS">Matemáticas</option>
              <option value="APOYO_PSICOLOGICO">Apoyo Psicológico</option>
            </select>
          </div>
        </div>
      </div>

      <div class="mb-6">
        <a routerLink="nuevo" class="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">
          Nueva Planificación
        </a>
      </div>

      <div *ngIf="planificacionesFiltradas.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div *ngFor="let planificacion of planificacionesFiltradas" 
             class="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 border border-gray-100 min-h-[320px] flex flex-col">
          <div class="flex-grow">
            <h3 class="text-xl font-bold mb-3 text-gray-800">{{formatTag(planificacion.tipo)}}</h3>
            <p class="text-gray-600 mb-4 line-clamp-3">{{planificacion.objetivos}}</p>
            
            <!-- Tags -->
            <div class="flex flex-wrap gap-2 mb-4">
              <span class="bg-indigo-100 text-indigo-800 text-sm px-3 py-1 rounded-full font-medium">{{formatTag(planificacion.tipo)}}</span>
              <span class="bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full font-medium">{{formatTag(planificacion.nivel)}}</span>
              <span class="bg-purple-100 text-purple-800 text-sm px-3 py-1 rounded-full font-medium">{{formatTag(planificacion.area)}}</span>
            </div>

            <!-- Información adicional -->
            <div class="text-sm text-gray-500 space-y-1">
              <div *ngIf="planificacion.ambito">
                <strong>Ámbito:</strong> {{planificacion.ambito}}
              </div>
              <div *ngIf="planificacion.nucleo">
                <strong>Núcleo:</strong> {{planificacion.nucleo}}
              </div>
              <div *ngIf="planificacion.eje">
                <strong>Eje:</strong> {{planificacion.eje}}
              </div>
              <div *ngIf="planificacion.actividadesVariables">
                <strong>Actividades Variables:</strong> {{planificacion.actividadesVariables}}
              </div>
              <div *ngIf="planificacion.recreosDirigidos">
                <strong>Recreos Dirigidos:</strong> {{planificacion.recreosDirigidos}}
              </div>
            </div>
          </div>
          
          <div class="mt-auto pt-4 border-t border-gray-100">
            <div class="flex justify-between items-center">
              <div class="space-x-2">
                <button *ngIf="planificacion.idPlanificacion"
                        (click)="editarPlanificacion(planificacion.idPlanificacion)" 
                        class="text-yellow-600 hover:text-yellow-800 p-2 rounded-lg hover:bg-yellow-50 transition-colors"
                        title="Editar planificación">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                  </svg>
                </button>
                <button *ngIf="planificacion.idPlanificacion"
                        (click)="eliminarPlanificacion(planificacion.idPlanificacion)" 
                        class="text-red-600 hover:text-red-800 p-2 rounded-lg hover:bg-red-50 transition-colors"
                        title="Eliminar planificación">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                  </svg>
                </button>
              </div>
              <button (click)="verPlanificacion(planificacion)" 
                     class="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors text-sm font-medium">
                Ver Detalles
              </button>
            </div>
          </div>
        </div>
      </div>

      <div *ngIf="planificacionesFiltradas.length === 0" class="text-center py-12">
        <div class="bg-gray-50 rounded-xl p-8 border-2 border-dashed border-gray-300">
          <svg class="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <h3 class="text-lg font-medium text-gray-900 mb-2">No hay planificaciones disponibles</h3>
          <p class="text-gray-500 mb-4">No se encontraron planificaciones con los filtros aplicados.</p>
          <a routerLink="nuevo" class="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
            </svg>
            Crear planificación
          </a>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class PlanificacionesListComponent implements OnInit {
  planificaciones: Planificacion[] = [];
  planificacionesFiltradas: Planificacion[] = [];
  
  // Filtros
  filtroNivel: string = '';
  filtroTipo: string = '';
  filtroArea: string = '';

  constructor(
    private planificacionService: PlanificacionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarPlanificaciones();
  }

  cargarPlanificaciones(): void {
    this.planificacionService.getAllPlanificaciones()
      .subscribe(planificaciones => {
        this.planificaciones = planificaciones;
        this.aplicarFiltros();
      });
  }

  aplicarFiltros(): void {
    this.planificacionesFiltradas = this.planificaciones.filter(planificacion => {
      const cumpleNivel = !this.filtroNivel || planificacion.nivel === this.filtroNivel;
      const cumpleTipo = !this.filtroTipo || planificacion.tipo === this.filtroTipo;
      const cumpleArea = !this.filtroArea || planificacion.area === this.filtroArea;
      
      return cumpleNivel && cumpleTipo && cumpleArea;
    });
  }

  editarPlanificacion(id: number): void {
    this.router.navigate(['/planificaciones/editar', id]);
  }

  eliminarPlanificacion(id: number): void {
    if (confirm('¿Está seguro de que desea eliminar esta planificación?')) {
      this.planificacionService.deletePlanificacion(id)
        .subscribe(() => {
          this.planificaciones = this.planificaciones.filter(p => p.idPlanificacion !== id);
          this.aplicarFiltros();
        });
    }
  }

  verPlanificacion(planificacion: Planificacion): void {
    this.router.navigate(['/planificaciones/detalle', planificacion.idPlanificacion]);
  }

  formatTag(tag: string): string {
    return tag.replace(/_/g, ' ');
  }
} 