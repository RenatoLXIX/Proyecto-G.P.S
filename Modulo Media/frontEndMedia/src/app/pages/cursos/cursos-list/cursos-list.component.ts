import { Component, OnInit } from '@angular/core';
import { CursoService } from '../../../services/curso.service';
import { Curso } from '../../../models/curso.interface';
import { Router } from '@angular/router';
import { RoleService } from '../../../services/role.service';
import { UserType } from '../../../models/user-type.model';

@Component({
  selector: 'app-cursos-list',
  template: `
    <div class="container mx-auto p-4">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-2xl font-bold">Mis Cursos</h2>
        <a routerLink="/home" class="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700">
          Volver al Inicio
        </a>
      </div>

      <div *ngIf="cursos.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div *ngFor="let curso of cursos" 
             class="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 border border-gray-100">
          <div class="flex items-center mb-4">
            <svg class="w-8 h-8 text-blue-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
            </svg>
            <h3 class="text-xl font-bold text-gray-800">{{curso.nombre}}</h3>
          </div>
          
          <p class="text-gray-600 mb-4">{{curso.descripcion}}</p>
          
          <div class="flex flex-wrap gap-2 mb-4">
            <span class="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full font-medium">{{formatTag(curso.nivel)}}</span>
            <span class="bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full font-medium">{{formatTag(curso.asignatura)}}</span>
          </div>
          
          <div class="flex items-center justify-between text-sm text-gray-600 mb-4">
            <span class="flex items-center">
              <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
              </svg>
              {{curso.profesor}}
            </span>
            <span class="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
              {{curso.activo ? 'Activo' : 'Inactivo'}}
            </span>
          </div>
          
          <div class="flex justify-between items-center">
            <button (click)="verMaterialesCurso(curso)" 
                   class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
              Ver Materiales
            </button>
            <button (click)="verEvaluacionesCurso(curso)" 
                   class="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium">
              Ver Evaluaciones
            </button>
          </div>
        </div>
      </div>

      <div *ngIf="cursos.length === 0" class="text-center py-12">
        <div class="bg-gray-50 rounded-xl p-8 border-2 border-dashed border-gray-300">
          <svg class="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
          </svg>
          <h3 class="text-lg font-medium text-gray-900 mb-2">No tienes cursos inscritos</h3>
          <p class="text-gray-500 mb-4">Aún no te has inscrito en ningún curso.</p>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class CursosListComponent implements OnInit {
  cursos: Curso[] = [];
  userType?: UserType;

  constructor(
    private cursoService: CursoService,
    private router: Router,
    private roleService: RoleService
  ) {}

  ngOnInit(): void {
    this.cargarCursos();
    this.roleService.selectedRole$.subscribe(role => {
      this.userType = role;
    });
  }

  cargarCursos(): void {
    // Simular cursos del estudiante
    this.cursos = [
      {
        idCurso: 1,
        nombre: 'Matemáticas 1° Medio',
        nivel: 'PRIMERO_MEDIO',
        asignatura: 'MATEMATICAS',
        profesor: 'Prof. García',
        descripcion: 'Curso de matemáticas para primer año medio',
        activo: true
      },
      {
        idCurso: 2,
        nombre: 'Lenguaje 1° Medio',
        nivel: 'PRIMERO_MEDIO',
        asignatura: 'LENGUAJE',
        profesor: 'Prof. Rodríguez',
        descripcion: 'Curso de lenguaje para primer año medio',
        activo: true
      },
      {
        idCurso: 3,
        nombre: 'Física 1° Medio',
        nivel: 'PRIMERO_MEDIO',
        asignatura: 'FISICA',
        profesor: 'Prof. López',
        descripcion: 'Curso de física para primer año medio',
        activo: true
      }
    ];
  }

  verMaterialesCurso(curso: Curso): void {
    this.router.navigate(['/materiales'], { queryParams: { asignatura: curso.asignatura } });
  }

  verEvaluacionesCurso(curso: Curso): void {
    this.router.navigate(['/evaluaciones'], { queryParams: { asignatura: curso.asignatura } });
  }

  formatTag(tag: string): string {
    return tag.replace(/_/g, ' ');
  }
} 