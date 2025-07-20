import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, Data } from '@angular/router';
import { PlanificacionService } from '../../../services/planificacion.service';
import { Planificacion } from '../../../models/planificacion.interface';

@Component({
  selector: 'app-planificacion-form',
  template: `
    <div class="max-w-4xl mx-auto">
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-3xl font-bold text-gray-900">{{ editMode ? 'Editar' : 'Nueva' }} Planificación</h1>
        <a routerLink="../" class="text-blue-600 hover:text-blue-800">← Volver</a>
      </div>

      <form [formGroup]="planificacionForm" (ngSubmit)="onSubmit()" class="bg-white rounded-lg shadow-md p-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Tipo -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Tipo *</label>
            <select formControlName="tipo" 
                    class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">Seleccione un tipo</option>
              <option value="ANUAL">Anual</option>
              <option value="CLASE_A_CLASE">Clase a Clase</option>
              <option value="RUTINA_DIARIA">Rutina Diaria</option>
            </select>
            <div *ngIf="planificacionForm.get('tipo')?.invalid && planificacionForm.get('tipo')?.touched" class="text-red-600 text-xs mt-1">Este campo es obligatorio.</div>
          </div>

          <!-- Nivel -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Nivel *</label>
            <select formControlName="nivel" 
                    class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">Seleccione un nivel</option>
              <option value="MEDIO_MENOR">Medio Menor</option>
              <option value="MEDIO_MAYOR">Medio Mayor</option>
              <option value="PRE_KINDER">Pre-Kinder</option>
              <option value="KINDER">Kinder</option>
            </select>
            <div *ngIf="planificacionForm.get('nivel')?.invalid && planificacionForm.get('nivel')?.touched" class="text-red-600 text-xs mt-1">Este campo es obligatorio.</div>
          </div>

          <!-- Área -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Área *</label>
            <select formControlName="area" 
                    class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">Seleccione un área</option>
              <option value="LENGUAJE">Lenguaje</option>
              <option value="MATEMATICAS">Matemáticas</option>
              <option value="APOYO_PSICOLOGICO">Apoyo Psicológico</option>
            </select>
            <div *ngIf="planificacionForm.get('area')?.invalid && planificacionForm.get('area')?.touched" class="text-red-600 text-xs mt-1">Este campo es obligatorio.</div>
          </div>

          <!-- Ámbito -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Ámbito (opcional)</label>
            <input formControlName="ambito" type="text" 
                   class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
          </div>

          <!-- Núcleo -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Núcleo (opcional)</label>
            <input formControlName="nucleo" type="text" 
                   class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
          </div>

          <!-- Eje -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Eje (opcional)</label>
            <input formControlName="eje" type="text" 
                   class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
          </div>

          <!-- Fecha de Clase -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Fecha de Clase</label>
            <input formControlName="fechaClase" type="date" 
                   class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
          </div>

          <!-- Objetivos -->
          <div class="md:col-span-2">
            <label class="block text-sm font-medium text-gray-700 mb-2">Objetivos *</label>
            <textarea formControlName="objetivos" rows="4" 
                      class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
            <div *ngIf="planificacionForm.get('objetivos')?.invalid && planificacionForm.get('objetivos')?.touched" class="text-red-600 text-xs mt-1">Este campo es obligatorio.</div>
          </div>

          <!-- Actividades Variables -->
          <div class="md:col-span-2">
            <label class="block text-sm font-medium text-gray-700 mb-2">Actividades Variables (opcional)</label>
            <textarea formControlName="actividadesVariables" rows="4" 
                      class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
          </div>

          <!-- Recreos Dirigidos -->
          <div class="md:col-span-2">
            <label class="block text-sm font-medium text-gray-700 mb-2">Recreos Dirigidos (opcional)</label>
            <textarea formControlName="recreosDirigidos" rows="3" 
                      class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
          </div>

          <!-- Checkboxes -->
          <div class="md:col-span-2">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <label class="flex items-center">
                <input formControlName="esDescargable" type="checkbox" class="mr-2">
                <span class="text-sm">Es descargable (opcional)</span>
              </label>
              <label class="flex items-center">
                <input formControlName="esEditable" type="checkbox" class="mr-2">
                <span class="text-sm">Es editable (opcional)</span>
              </label>
            </div>
          </div>
        </div>

        <!-- Botones -->
        <div class="flex justify-end space-x-4 mt-6" *ngIf="!readOnly">
          <button type="button" (click)="onCancel()" 
                  class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
            Cancelar
          </button>
          <button type="submit" 
                  class="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
            {{ editMode ? 'Actualizar' : 'Crear' }}
          </button>
        </div>
      </form>
    </div>
  `,
  styles: []
})
export class PlanificacionFormComponent implements OnInit {
  planificacionForm: FormGroup;
  editMode = false;
  planificacionId: number | null = null;
  readOnly = false;

  constructor(
    private fb: FormBuilder,
    private planificacionService: PlanificacionService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.planificacionForm = this.fb.group({
      tipo: ['', [Validators.required]],
      nivel: ['', [Validators.required]],
      area: ['', [Validators.required]],
      ambito: [''], // opcional
      nucleo: [''], // opcional
      eje: [''], // opcional
      objetivos: ['', [Validators.required]],
      actividadesVariables: [''], // opcional
      recreosDirigidos: [''], // opcional
      fechaClase: [''], // opcional
      esDescargable: [true], // opcional
      esEditable: [true] // opcional
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.route.data.subscribe((data: Data) => {
      this.readOnly = !!data['readOnly'];
      if (this.readOnly) {
        this.planificacionForm.disable();
      }
    });
    if (id) {
      this.editMode = !this.readOnly;
      this.planificacionId = id;
      this.planificacionService.getPlanificacionById(id).subscribe(planificacion => {
        this.planificacionForm.patchValue(planificacion);
      });
    }
  }

  onSubmit(): void {
    if (this.planificacionForm.valid) {
      const planificacion: Planificacion = {
        ...this.planificacionForm.value,
        fechaCreacion: new Date()
      };

      if (this.editMode && this.planificacionId) {
        this.planificacionService.updatePlanificacion(this.planificacionId, planificacion)
          .subscribe(() => this.router.navigate(['/planificaciones']));
      } else {
        this.planificacionService.createPlanificacion(planificacion)
          .subscribe(() => this.router.navigate(['/planificaciones']));
      }
    }
  }

  onCancel(): void {
    this.router.navigate(['/planificaciones']);
  }
} 