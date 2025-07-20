import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CursoService } from '../../../services/curso.service';
import { Curso } from '../../../models/curso.interface';

@Component({
  selector: 'app-curso-form',
  template: `
    <div class="container mx-auto p-4">
      <div class="max-w-2xl mx-auto">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-2xl font-bold">{{isEditing ? 'Editar' : 'Nuevo'}} Curso</h2>
          <a routerLink="/cursos" class="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700">
            Volver a Cursos
          </a>
        </div>

        <form [formGroup]="cursoForm" (ngSubmit)="onSubmit()" class="bg-white rounded-xl shadow-lg p-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Nombre del Curso -->
            <div class="md:col-span-2">
              <label class="block text-sm font-medium text-gray-700 mb-2">Nombre del Curso</label>
              <input type="text" formControlName="nombre" 
                     class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
              <div *ngIf="cursoForm.get('nombre')?.invalid && cursoForm.get('nombre')?.touched" 
                   class="text-red-500 text-sm mt-1">
                El nombre del curso es requerido
              </div>
            </div>

            <!-- Nivel -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Nivel</label>
              <select formControlName="nivel" 
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="">Seleccionar nivel</option>
                <option value="PRIMERO_MEDIO">Primero Medio</option>
                <option value="SEGUNDO_MEDIO">Segundo Medio</option>
                <option value="TERCERO_MEDIO">Tercero Medio</option>
                <option value="CUARTO_MEDIO">Cuarto Medio</option>
              </select>
              <div *ngIf="cursoForm.get('nivel')?.invalid && cursoForm.get('nivel')?.touched" 
                   class="text-red-500 text-sm mt-1">
                El nivel es requerido
              </div>
            </div>

            <!-- Asignatura -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Asignatura</label>
              <select formControlName="asignatura" 
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="">Seleccionar asignatura</option>
                <option value="MATEMATICAS">Matemáticas</option>
                <option value="LENGUAJE">Lenguaje</option>
                <option value="FISICA">Física</option>
                <option value="QUIMICA">Química</option>
                <option value="BIOLOGIA">Biología</option>
                <option value="HISTORIA">Historia</option>
                <option value="INGLES">Inglés</option>
                <option value="PSICOLOGIA">Psicología</option>
              </select>
              <div *ngIf="cursoForm.get('asignatura')?.invalid && cursoForm.get('asignatura')?.touched" 
                   class="text-red-500 text-sm mt-1">
                La asignatura es requerida
              </div>
            </div>

            <!-- Profesor -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Profesor</label>
              <input type="text" formControlName="profesor" 
                     class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
              <div *ngIf="cursoForm.get('profesor')?.invalid && cursoForm.get('profesor')?.touched" 
                   class="text-red-500 text-sm mt-1">
                El profesor es requerido
              </div>
            </div>

            <!-- Estado -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Estado</label>
              <select formControlName="activo" 
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option [ngValue]="true">Activo</option>
                <option [ngValue]="false">Inactivo</option>
              </select>
            </div>

            <!-- Descripción -->
            <div class="md:col-span-2">
              <label class="block text-sm font-medium text-gray-700 mb-2">Descripción</label>
              <textarea formControlName="descripcion" rows="4"
                        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
            </div>
          </div>

          <div class="flex justify-end space-x-4 mt-6">
            <button type="button" (click)="cancelar()" 
                    class="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
              Cancelar
            </button>
            <button type="submit" [disabled]="cursoForm.invalid" 
                    class="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed">
              {{isEditing ? 'Actualizar' : 'Crear'}} Curso
            </button>
          </div>
        </form>
      </div>
    </div>
  `,
  styles: []
})
export class CursoFormComponent implements OnInit {
  cursoForm: FormGroup;
  isEditing = false;
  cursoId?: number;

  constructor(
    private fb: FormBuilder,
    private cursoService: CursoService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.cursoForm = this.fb.group({
      nombre: ['', Validators.required],
      nivel: ['', Validators.required],
      asignatura: ['', Validators.required],
      profesor: ['', Validators.required],
      descripcion: [''],
      activo: [true]
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditing = true;
      this.cursoId = +id;
      this.cargarCurso(this.cursoId);
    }
  }

  cargarCurso(id: number): void {
    // Simular carga de curso
    const curso: Curso = {
      idCurso: id,
      nombre: 'Matemáticas 1° Medio',
      nivel: 'PRIMERO_MEDIO',
      asignatura: 'MATEMATICAS',
      profesor: 'Prof. García',
      descripcion: 'Curso de matemáticas para primer año medio',
      activo: true
    };
    this.cursoForm.patchValue(curso);
  }

  onSubmit(): void {
    if (this.cursoForm.valid) {
      const curso: Curso = this.cursoForm.value;
      
      if (this.isEditing && this.cursoId) {
        // Actualizar curso
        console.log('Actualizando curso:', curso);
      } else {
        // Crear nuevo curso
        console.log('Creando curso:', curso);
      }
      
      this.router.navigate(['/cursos']);
    }
  }

  cancelar(): void {
    this.router.navigate(['/cursos']);
  }
} 