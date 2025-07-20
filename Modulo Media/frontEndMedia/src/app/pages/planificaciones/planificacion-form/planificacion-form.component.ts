import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PlanificacionService } from '../../../services/planificacion.service';
import { MaterialService } from '../../../services/material.service';
import { Planificacion } from '../../../models/planificacion.interface';
import { Material } from '../../../models/material.interface';

@Component({
  selector: 'app-planificacion-form',
  template: `
    <div class="container mx-auto p-4">
      <h2 class="text-2xl font-bold mb-6">{{editMode ? 'Editar' : 'Nueva'}} Planificación</h2>
      
      <form [formGroup]="planificacionForm" (ngSubmit)="onSubmit()" class="max-w-2xl">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="tipo">
              Tipo
            </label>
            <select
              formControlName="tipo"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              [ngClass]="{'border-red-500': submitted && f['tipo'].errors}"
            >
              <option value="">Seleccione un tipo</option>
              <option value="ANUAL">Anual</option>
              <option value="SEMESTRAL">Semestral</option>
              <option value="UNIDAD">Unidad</option>
              <option value="CLASE">Clase</option>
            </select>
          </div>

          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="nivel">
              Nivel
            </label>
            <select
              formControlName="nivel"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              [ngClass]="{'border-red-500': submitted && f['nivel'].errors}"
            >
              <option value="">Seleccione un nivel</option>
              <option value="PRIMERO_MEDIO">Primero Medio</option>
              <option value="SEGUNDO_MEDIO">Segundo Medio</option>
              <option value="TERCERO_MEDIO">Tercero Medio</option>
              <option value="CUARTO_MEDIO">Cuarto Medio</option>
            </select>
          </div>

          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="asignatura">
              Asignatura
            </label>
            <select
              formControlName="asignatura"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              [ngClass]="{'border-red-500': submitted && f['asignatura'].errors}"
            >
              <option value="">Seleccione una asignatura</option>
              <option value="MATEMATICAS">Matemáticas</option>
              <option value="LENGUAJE">Lenguaje</option>
              <option value="FISICA">Física</option>
              <option value="QUIMICA">Química</option>
              <option value="BIOLOGIA">Biología</option>
              <option value="HISTORIA">Historia</option>
              <option value="INGLES">Inglés</option>
              <option value="PSICOLOGIA">Psicología</option>
              <option value="EMPRENDIMIENTO">Emprendimiento</option>
            </select>
          </div>

          <div class="mb-4 col-span-2">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="objetivos">
              Objetivos
            </label>
            <textarea
              formControlName="objetivos"
              rows="3"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              [ngClass]="{'border-red-500': submitted && f['objetivos'].errors}"
            ></textarea>
          </div>

          <div class="mb-4 col-span-2">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="idMaterial">
              Materiales
            </label>
            <select
              formControlName="idMaterial"
              multiple
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              [ngClass]="{'border-red-500': submitted && f['idMaterial'].errors}"
              (change)="onMaterialesChange($event)"
            >
              <option *ngFor="let material of materiales" [value]="material.idMaterial">
                {{material.titulo}} ({{material.tipo}})
              </option>
            </select>
            <p class="text-sm text-gray-600 mt-1">Mantén presionado Ctrl (Cmd en Mac) para seleccionar múltiples materiales</p>
          </div>
        </div>

        <div class="flex justify-end space-x-4 mt-6">
          <button
            type="button"
            (click)="onCancel()"
            class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Cancelar
          </button>
          <button
            type="submit"
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            {{editMode ? 'Actualizar' : 'Crear'}}
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
  submitted = false;
  planificacionId: number | null = null;
  materiales: Material[] = [];
  selectedMaterialIds: number[] = [];

  constructor(
    private fb: FormBuilder,
    private planificacionService: PlanificacionService,
    private materialService: MaterialService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.planificacionForm = this.fb.group({
      tipo: ['', [Validators.required]],
      nivel: ['', [Validators.required]],
      asignatura: ['', [Validators.required]],
      objetivos: ['', [Validators.required]],
      idMaterial: [[], [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.cargarMateriales();

    const id = this.route.snapshot.params['id'];
    if (id) {
      this.editMode = true;
      this.planificacionId = id;
      this.planificacionService.getPlanificacionById(id)
        .subscribe(planificacion => {
          // Aseguramos que materiales existe y es un array
          const materialIds = planificacion.materiales || [];
          this.planificacionForm.patchValue({
            ...planificacion,
            idMaterial: materialIds
          });
          this.selectedMaterialIds = materialIds;
        });
    }
  }

  cargarMateriales(): void {
    this.materialService.getAllMateriales()
      .subscribe(materiales => {
        this.materiales = materiales;
      });
  }

  onMaterialesChange(event: any): void {
    const select = event.target;
    const selectedIds = Array.from(select.selectedOptions).map((option: any) => Number(option.value));
    this.selectedMaterialIds = selectedIds;
  }

  get f() { return this.planificacionForm.controls; }

  onSubmit(): void {
    this.submitted = true;

    if (this.planificacionForm.invalid) {
      return;
    }

    const planificacion: Planificacion = {
      ...this.planificacionForm.value,
      fechaCreacion: new Date(),
      materiales: this.selectedMaterialIds
    };

    if (this.editMode && this.planificacionId) {
      this.planificacionService.updatePlanificacion(this.planificacionId, planificacion)
        .subscribe(() => this.router.navigate(['/planificaciones']));
    } else {
      this.planificacionService.createPlanificacion(planificacion)
        .subscribe(() => this.router.navigate(['/planificaciones']));
    }
  }

  onCancel(): void {
    this.router.navigate(['/planificaciones']);
  }
} 