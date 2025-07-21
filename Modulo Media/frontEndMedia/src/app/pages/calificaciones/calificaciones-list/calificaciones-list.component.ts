import { Component, OnInit } from '@angular/core';
import { CalificacionService } from '../../../services/calificacion.service';
import { CalificacionEstudiante } from '../../../models/calificacion.interface';
import { Router } from '@angular/router';
import { RoleService } from '../../../services/role.service';
import { UserType } from '../../../models/user-type.model';

@Component({
  selector: 'app-calificaciones-list',
  template: `
    <div class="container mx-auto p-4">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-2xl font-bold">Mis Calificaciones</h2>
        <a routerLink="/home" class="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700">
          Volver al Inicio
        </a>
      </div>

      <!-- Resumen de Calificaciones -->
      <div class="bg-white rounded-xl shadow-lg p-6 mb-6">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="text-center">
            <div class="text-3xl font-bold text-green-600">{{promedioGeneral | number:'1.1-1'}}</div>
            <div class="text-sm text-gray-600">Promedio General</div>
          </div>
          <div class="text-center">
            <div class="text-3xl font-bold text-blue-600">{{totalEvaluaciones}}</div>
            <div class="text-sm text-gray-600">Total Evaluaciones</div>
          </div>
          <div class="text-center">
            <div class="text-3xl font-bold text-purple-600">{{asignaturasInscritas.length}}</div>
            <div class="text-sm text-gray-600">Asignaturas</div>
          </div>
        </div>
      </div>

      <!-- Filtros -->
      <div class="bg-white rounded-xl shadow-lg p-4 mb-6">
        <div class="flex flex-wrap gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Asignatura</label>
            <select [(ngModel)]="filtroAsignatura" (change)="aplicarFiltros()" 
                    class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">Todas las asignaturas</option>
              <option *ngFor="let asignatura of asignaturasInscritas" [value]="asignatura">{{asignatura}}</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Tipo de Evaluación</label>
            <select [(ngModel)]="filtroTipo" (change)="aplicarFiltros()" 
                    class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">Todos los tipos</option>
              <option value="PRUEBA">Prueba</option>
              <option value="CONTROL">Control</option>
              <option value="TALLER">Taller</option>
              <option value="GUIA">Guía</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Lista de Calificaciones -->
      <div *ngIf="calificacionesFiltradas.length > 0" class="bg-white rounded-xl shadow-lg overflow-hidden">
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Evaluación</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Asignatura</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nota</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Porcentaje</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr *ngFor="let calificacion of calificacionesFiltradas" class="hover:bg-gray-50">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm font-medium text-gray-900">{{calificacion.nombreEvaluacion}}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">{{formatTag(calificacion.asignatura)}}</span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">{{formatTag(calificacion.tipoEvaluacion)}}</span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <span class="text-lg font-bold" [ngClass]="getNotaClass(calificacion.nota)">
                      {{calificacion.nota | number:'1.1-1'}}
                    </span>
                    <span class="text-sm text-gray-500 ml-1">/ {{calificacion.notaMaxima}}</span>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="w-16 bg-gray-200 rounded-full h-2 mr-2">
                      <div class="bg-green-600 h-2 rounded-full" [style.width.%]="calificacion.porcentaje"></div>
                    </div>
                    <span class="text-sm text-gray-600">{{calificacion.porcentaje | number:'1.0-0'}}%</span>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{calificacion.fechaCalificacion | date:'dd/MM/yyyy'}}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div *ngIf="calificacionesFiltradas.length === 0" class="text-center py-12">
        <div class="bg-gray-50 rounded-xl p-8 border-2 border-dashed border-gray-300">
          <svg class="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
          </svg>
          <h3 class="text-lg font-medium text-gray-900 mb-2">No hay calificaciones disponibles</h3>
          <p class="text-gray-500 mb-4">Aún no tienes calificaciones registradas.</p>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class CalificacionesListComponent implements OnInit {
  calificaciones: CalificacionEstudiante[] = [];
  calificacionesFiltradas: CalificacionEstudiante[] = [];
  promedioGeneral: number = 0;
  totalEvaluaciones: number = 0;
  asignaturasInscritas: string[] = [];
  
  filtroAsignatura: string = '';
  filtroTipo: string = '';
  
  userType?: UserType;

  constructor(
    private calificacionService: CalificacionService,
    private router: Router,
    private roleService: RoleService
  ) {}

  ngOnInit(): void {
    this.cargarCalificaciones();
    this.roleService.selectedRole$.subscribe(role => {
      this.userType = role;
    });
  }

  cargarCalificaciones(): void {
    // Simular calificaciones del estudiante
    this.calificaciones = [
      {
        idCalificacion: 1,
        nombreEvaluacion: 'Prueba de Álgebra',
        tipoEvaluacion: 'PRUEBA',
        asignatura: 'MATEMATICAS',
        nota: 6.5,
        notaMaxima: 7.0,
        fechaCalificacion: new Date('2024-03-15'),
        comentario: 'Excelente trabajo',
        porcentaje: 92.9
      },
      {
        idCalificacion: 2,
        nombreEvaluacion: 'Control de Lectura',
        tipoEvaluacion: 'CONTROL',
        asignatura: 'LENGUAJE',
        nota: 5.8,
        notaMaxima: 7.0,
        fechaCalificacion: new Date('2024-03-10'),
        comentario: 'Buen trabajo, mejorar análisis',
        porcentaje: 82.9
      },
      {
        idCalificacion: 3,
        nombreEvaluacion: 'Taller de Física',
        tipoEvaluacion: 'TALLER',
        asignatura: 'FISICA',
        nota: 6.9,
        notaMaxima: 7.0,
        fechaCalificacion: new Date('2024-03-08'),
        comentario: 'Muy buen trabajo',
        porcentaje: 98.6
      }
    ];
    
    this.calificacionesFiltradas = [...this.calificaciones];
    this.calcularEstadisticas();
  }

  calcularEstadisticas(): void {
    this.promedioGeneral = this.calificaciones.reduce((sum, cal) => sum + cal.nota, 0) / this.calificaciones.length;
    this.totalEvaluaciones = this.calificaciones.length;
    this.asignaturasInscritas = [...new Set(this.calificaciones.map(cal => cal.asignatura))];
  }

  aplicarFiltros(): void {
    this.calificacionesFiltradas = this.calificaciones.filter(cal => {
      const cumpleAsignatura = !this.filtroAsignatura || cal.asignatura === this.filtroAsignatura;
      const cumpleTipo = !this.filtroTipo || cal.tipoEvaluacion === this.filtroTipo;
      return cumpleAsignatura && cumpleTipo;
    });
  }

  getNotaClass(nota: number): string {
    if (nota >= 6.0) return 'text-green-600';
    if (nota >= 4.0) return 'text-yellow-600';
    return 'text-red-600';
  }

  formatTag(tag: string): string {
    return tag.replace(/_/g, ' ');
  }
} 