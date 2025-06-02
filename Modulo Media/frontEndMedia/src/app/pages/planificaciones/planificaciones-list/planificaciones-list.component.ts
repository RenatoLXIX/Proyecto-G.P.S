import { Component, OnInit } from '@angular/core';
import { PlanificacionService } from '../../../services/planificacion.service';
import { MaterialService } from '../../../services/material.service';
import { Planificacion } from '../../../models/planificacion.interface';
import { Material } from '../../../models/material.interface';

@Component({
  selector: 'app-planificaciones-list',
  template: `
    <div class="container mx-auto p-4">
      <div class="flex justify-between items-center mb-6">
        <div class="flex items-center space-x-4">
          <a routerLink="/home" class="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700">
            Volver al Inicio
          </a>
          <h2 class="text-2xl font-bold">Planificaciones</h2>
        </div>
        <a routerLink="nuevo" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Nueva Planificación
        </a>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div *ngFor="let planificacion of planificaciones" 
             class="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
          <div class="flex justify-between items-start mb-2">
            <div>
              <h3 class="text-xl font-semibold">{{planificacion.tipo}}</h3>
            </div>
            <div class="flex gap-2">
              <span class="bg-green-100 text-green-800 text-sm px-2 py-1 rounded">{{planificacion.nivel}}</span>
              <span class="bg-purple-100 text-purple-800 text-sm px-2 py-1 rounded">{{planificacion.asignatura}}</span>
            </div>
          </div>

          <div class="mt-4">
            <h4 class="font-semibold text-gray-700">Objetivos:</h4>
            <p class="text-gray-600">{{planificacion.objetivos}}</p>
          </div>

          <div class="mt-4">
            <h4 class="font-semibold text-gray-700">Materiales:</h4>
            <div class="flex flex-wrap gap-2">
              <span *ngFor="let materialId of planificacion.materiales || []" 
                    class="bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded">
                {{getMaterialTitulo(materialId)}}
              </span>
              <span *ngIf="!planificacion.materiales?.length" class="text-gray-500 text-sm">
                No hay materiales asignados
              </span>
            </div>
          </div>

          <div class="flex justify-start items-center mt-6 space-x-4">
            <div class="space-x-2">
              <button *ngIf="planificacion.idPlanificacion"
                      (click)="editarPlanificacion(planificacion.idPlanificacion)" 
                      class="text-yellow-600 hover:text-yellow-800">
                Editar
              </button>
              <button *ngIf="planificacion.idPlanificacion"
                      (click)="eliminarPlanificacion(planificacion.idPlanificacion)" 
                      class="text-red-600 hover:text-red-800">
                Eliminar
              </button>
            </div>
            <span class="text-sm text-gray-500">
              Creado: {{planificacion.fechaCreacion | date:'dd/MM/yyyy'}}
            </span>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class PlanificacionesListComponent implements OnInit {
  planificaciones: Planificacion[] = [];
  materiales: Map<number, Material> = new Map();

  constructor(
    private planificacionService: PlanificacionService,
    private materialService: MaterialService
  ) {}

  ngOnInit(): void {
    this.cargarPlanificaciones();
    this.cargarMateriales();
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
    // La navegación se maneja a través del routerLink
  }

  eliminarPlanificacion(id: number): void {
    if (confirm('¿Está seguro de que desea eliminar esta planificación?')) {
      this.planificacionService.deletePlanificacion(id)
        .subscribe(() => {
          this.planificaciones = this.planificaciones.filter(p => p.idPlanificacion !== id);
        });
    }
  }
} 