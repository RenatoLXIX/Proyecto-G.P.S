import { Component, OnInit } from '@angular/core';
import { PlanificacionService } from '../../../services/planificacion.service';
import { MaterialService } from '../../../services/material.service';
import { Planificacion } from '../../../models/planificacion.interface';
import { Material } from '../../../models/material.interface';
import { Router } from '@angular/router';
import { RoleService } from '../../../services/role.service';
import { UserType } from '../../../models/user-type.model';

@Component({
  selector: 'app-planificaciones-list',
  template: `
    <div class="container mx-auto p-4">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-2xl font-bold">Planificaciones</h2>
        <a routerLink="/home" class="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700">
          Volver al Inicio
        </a>
      </div>

      <div class="mb-6">
        <a *ngIf="canCreate()" routerLink="nuevo" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Nueva Planificación
        </a>
      </div>

      <div *ngIf="planificaciones.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div *ngFor="let planificacion of planificaciones" 
             class="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 border border-gray-100 min-h-[320px] flex flex-col">
          <div class="flex-grow">
            <div class="flex justify-between items-start mb-3">
              <h3 class="text-xl font-bold text-gray-800">{{planificacion.tipo}}</h3>
              <div class="flex gap-2">
                <span class="bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full font-medium">{{formatTag(planificacion.nivel)}}</span>
                <span class="bg-purple-100 text-purple-800 text-sm px-3 py-1 rounded-full font-medium">{{formatTag(planificacion.asignatura)}}</span>
              </div>
            </div>

            <div class="mb-4">
              <h4 class="font-semibold text-gray-700 mb-2">Objetivos:</h4>
              <p class="text-gray-600 line-clamp-3">{{planificacion.objetivos}}</p>
            </div>

            <div class="mb-4">
              <h4 class="font-semibold text-gray-700 mb-2">Materiales:</h4>
              <div class="flex flex-wrap gap-2">
                <span *ngFor="let materialId of planificacion.materiales || []" 
                      class="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full font-medium">
                  {{getMaterialTitulo(materialId)}}
                </span>
                <span *ngIf="!planificacion.materiales?.length" class="text-gray-500 text-sm">
                  No hay materiales asignados
                </span>
              </div>
            </div>
          </div>

          <div class="mt-auto pt-4 border-t border-gray-100">
            <div class="flex justify-between items-center">
              <div class="space-x-2">
                <button *ngIf="planificacion.idPlanificacion && canCreate()"
                        (click)="editarPlanificacion(planificacion.idPlanificacion)" 
                        class="text-yellow-600 hover:text-yellow-800 p-2 rounded-lg hover:bg-yellow-50 transition-colors"
                        title="Editar planificación">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                  </svg>
                </button>
                <button *ngIf="planificacion.idPlanificacion && canCreate()"
                        (click)="eliminarPlanificacion(planificacion.idPlanificacion)" 
                        class="text-red-600 hover:text-red-800 p-2 rounded-lg hover:bg-red-50 transition-colors"
                        title="Eliminar planificación">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                  </svg>
                </button>
              </div>
              <span class="text-sm text-gray-500">
                {{planificacion.fechaCreacion | date:'dd/MM/yyyy'}}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div *ngIf="planificaciones.length === 0" class="text-center py-12">
        <div class="bg-gray-50 rounded-xl p-8 border-2 border-dashed border-gray-300">
          <svg class="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <h3 class="text-lg font-medium text-gray-900 mb-2">No hay planificaciones disponibles</h3>
          <p class="text-gray-500 mb-4">Aún no se han creado planificaciones en esta sección.</p>
          <a *ngIf="canCreate()" routerLink="nuevo" class="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
            </svg>
            Crear primera planificación
          </a>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class PlanificacionesListComponent implements OnInit {
  planificaciones: Planificacion[] = [];
  materiales: Map<number, Material> = new Map();
  userType?: UserType;

  constructor(
    private planificacionService: PlanificacionService,
    private materialService: MaterialService,
    private roleService: RoleService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarPlanificaciones();
    this.cargarMateriales();
    this.roleService.selectedRole$.subscribe(role => {
      this.userType = role;
    });
  }

  canCreate(): boolean {
    return this.userType === UserType.ADMINISTRADOR || this.userType === UserType.PROFESOR;
  }

  cargarPlanificaciones(): void {
    this.planificacionService.getAllPlanificaciones()
      .subscribe(planificaciones => this.planificaciones = planificaciones);
  }

  cargarMateriales(): void {
    this.materialService.getAllMateriales()
      .subscribe(materiales => {
        materiales.forEach(material => {
          if (material.idMaterial !== undefined) {
            this.materiales.set(material.idMaterial, material);
          }
        });
      });
  }

  getMaterialTitulo(id: number): string {
    const material = this.materiales.get(id);
    return material ? material.titulo : 'Material no encontrado';
  }

  editarPlanificacion(id: number): void {
    this.router.navigate(['/planificaciones/editar', id]);
  }

  eliminarPlanificacion(id: number): void {
    if (confirm('¿Está seguro de que desea eliminar esta planificación?')) {
      this.planificacionService.deletePlanificacion(id)
        .subscribe(() => {
          this.planificaciones = this.planificaciones.filter(p => p.idPlanificacion !== id);
        });
    }
  }

  formatTag(tag: string): string {
    return tag.replace(/_/g, ' ');
  }
} 