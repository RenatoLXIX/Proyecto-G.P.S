import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CalificacionService } from '../../../services/calificacion.service';
import { Calificacion } from '../../../models/calificacion.interface';

@Component({
  selector: 'app-calificacion-form',
  template: `
    <div class="container mx-auto p-4">
      <div class="max-w-2xl mx-auto">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-2xl font-bold">{{isEditing ? 'Editar' : 'Nueva'}} Calificación</h2>
          <a routerLink="/calificaciones" class="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700">
            Volver a Calificaciones
          </a>
        </div>

        <form [formGroup]="calificacionForm" (ngSubmit)="onSubmit()" class="bg-white rounded-xl shadow-lg p-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Estudiante -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Estudiante</label>
              <select formControlName="idEstudiante" 
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="">Seleccionar estudiante</option>
                <option value="1">Juan Pérez</option>
                <option value="2">María García</option>
                <option value="3">Carlos López</option>
              </select>
              <div *ngIf="calificacionForm.get('idEstudiante')?.invalid && calificacionForm.get('idEstudiante')?.touched" 
                   class="text-red-500 text-sm mt-1">
                El estudiante es requerido
              </div>
            </div>

            <!-- Evaluación -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Evaluación</label>
              <select formControlName="idEvaluacion" 
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="">Seleccionar evaluación</option>
                <option value="1">Prueba de Álgebra</option>
                <option value="2">Control de Lectura</option>
                <option value="3">Taller de Física</option>
              </select>
              <div *ngIf="calificacionForm.get('idEvaluacion')?.invalid && calificacionForm.get('idEvaluacion')?.touched" 
                   class="text-red-500 text-sm mt-1">
                La evaluación es requerida
              </div>
            </div>

            <!-- Curso -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Curso</label>
              <select formControlName="idCurso" 
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="">Seleccionar curso</option>
                <option value="1">Matemáticas 1° Medio</option>
                <option value="2">Lenguaje 1° Medio</option>
                <option value="3">Física 1° Medio</option>
              </select>
              <div *ngIf="calificacionForm.get('idCurso')?.invalid && calificacionForm.get('idCurso')?.touched" 
                   class="text-red-500 text-sm mt-1">
                El curso es requerido
              </div>
            </div>

            <!-- Nota -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Nota</label>
              <input type="number" formControlName="nota" min="1" max="7" step="0.1"
                     class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
              <div *ngIf="calificacionForm.get('nota')?.invalid && calificacionForm.get('nota')?.touched" 
                   class="text-red-500 text-sm mt-1">
                La nota debe estar entre 1.0 y 7.0
              </div>
            </div>

            <!-- Tipo de Evaluación -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Tipo de Evaluación</label>
              <select formControlName="tipoEvaluacion" 
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="">Seleccionar tipo</option>
                <option value="PRUEBA">Prueba</option>
                <option value="CONTROL">Control</option>
                <option value="TALLER">Taller</option>
                <option value="GUIA">Guía</option>
              </select>
              <div *ngIf="calificacionForm.get('tipoEvaluacion')?.invalid && calificacionForm.get('tipoEvaluacion')?.touched" 
                   class="text-red-500 text-sm mt-1">
                El tipo de evaluación es requerido
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
              <div *ngIf="calificacionForm.get('asignatura')?.invalid && calificacionForm.get('asignatura')?.touched" 
                   class="text-red-500 text-sm mt-1">
                La asignatura es requerida
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
              <div *ngIf="calificacionForm.get('nivel')?.invalid && calificacionForm.get('nivel')?.touched" 
                   class="text-red-500 text-sm mt-1">
                El nivel es requerido
              </div>
            </div>

            <!-- Comentario -->
            <div class="md:col-span-2">
              <label class="block text-sm font-medium text-gray-700 mb-2">Comentario</label>
              <textarea formControlName="comentario" rows="3"
                        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Comentarios sobre la calificación..."></textarea>
            </div>
          </div>

          <div class="flex justify-end space-x-4 mt-6">
            <button type="button" (click)="cancelar()" 
                    class="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
              Cancelar
            </button>
            <button type="submit" [disabled]="calificacionForm.invalid" 
                    class="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed">
              {{isEditing ? 'Actualizar' : 'Crear'}} Calificación
            </button>
          </div>
        </form>
      </div>
    </div>
  `,
  styles: []
})
export class CalificacionFormComponent implements OnInit {
  calificacionForm: FormGroup;
  isEditing = false;
  calificacionId?: number;

  constructor(
    private fb: FormBuilder,
    private calificacionService: CalificacionService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.calificacionForm = this.fb.group({
      idEstudiante: ['', Validators.required],
      idEvaluacion: ['', Validators.required],
      idCurso: ['', Validators.required],
      nota: ['', [Validators.required, Validators.min(1), Validators.max(7)]],
      tipoEvaluacion: ['', Validators.required],
      asignatura: ['', Validators.required],
      nivel: ['', Validators.required],
      comentario: ['']
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditing = true;
      this.calificacionId = +id;
      this.cargarCalificacion(this.calificacionId);
    }
  }

  cargarCalificacion(id: number): void {
    // Simular carga de calificación
    const calificacion: Calificacion = {
      idCalificacion: id,
      idEstudiante: 1,
      idEvaluacion: 1,
      idCurso: 1,
      nota: 6.5,
      fechaCalificacion: new Date(),
      comentario: 'Excelente trabajo',
      tipoEvaluacion: 'PRUEBA',
      asignatura: 'MATEMATICAS',
      nivel: 'PRIMERO_MEDIO'
    };
    this.calificacionForm.patchValue(calificacion);
  }

  onSubmit(): void {
    if (this.calificacionForm.valid) {
      const calificacion: Calificacion = {
        ...this.calificacionForm.value,
        fechaCalificacion: new Date()
      };
      
      if (this.isEditing && this.calificacionId) {
        // Actualizar calificación
        console.log('Actualizando calificación:', calificacion);
      } else {
        // Crear nueva calificación
        console.log('Creando calificación:', calificacion);
      }
      
      this.router.navigate(['/calificaciones']);
    }
  }

  cancelar(): void {
    this.router.navigate(['/calificaciones']);
  }
} 