import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EvaluacionService } from '../../../services/evaluacion.service';
import { MaterialService } from '../../../services/material.service';
import { Evaluacion } from '../../../models/evaluacion.interface';
import { Material } from '../../../models/material.interface';

@Component({
  selector: 'app-evaluacion-form',
  template: `
    <div class="container mx-auto p-4">
      <h2 class="text-2xl font-bold mb-6">{{editMode ? 'Editar' : 'Nueva'}} Evaluación</h2>
      
      <form [formGroup]="evaluacionForm" (ngSubmit)="onSubmit()" class="max-w-2xl">
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
              <option value="PRUEBA">Prueba</option>
              <option value="CONTROL">Control</option>
              <option value="TALLER">Taller</option>
              <option value="GUIA">Guía</option>
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
              <option value="CIENCIAS">Ciencias</option>
              <option value="HISTORIA">Historia</option>
            </select>
          </div>

          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="tiempoMinutos">
              Tiempo (minutos)
            </label>
            <input
              formControlName="tiempoMinutos"
              type="number"
              min="1"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              [ngClass]="{'border-red-500': submitted && f['tiempoMinutos'].errors}"
            >
          </div>

          <div class="mb-4 col-span-2">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="descripcion">
              Descripción
            </label>
            <textarea
              formControlName="descripcion"
              rows="3"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              [ngClass]="{'border-red-500': submitted && f['descripcion'].errors}"
            ></textarea>
          </div>

          <div class="mb-4 col-span-2">
            <label class="block text-gray-700 text-sm font-bold mb-2">
              Tipo de Recurso
            </label>
            <div class="flex gap-4">
              <label class="inline-flex items-center">
                <input
                  type="radio"
                  formControlName="tipoRecurso"
                  value="URL"
                  class="form-radio h-5 w-5 text-blue-600"
                >
                <span class="ml-2">URL</span>
              </label>
              <label class="inline-flex items-center">
                <input
                  type="radio"
                  formControlName="tipoRecurso"
                  value="LOCAL"
                  class="form-radio h-5 w-5 text-blue-600"
                >
                <span class="ml-2">Archivo Local</span>
              </label>
            </div>
          </div>

          <div *ngIf="f['tipoRecurso'].value === 'URL'" class="mb-4 col-span-2">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="urlRecurso">
              URL del Recurso
            </label>
            <input
              formControlName="urlRecurso"
              type="url"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              [ngClass]="{'border-red-500': submitted && f['urlRecurso'].errors}"
            >
          </div>

          <div *ngIf="f['tipoRecurso'].value === 'LOCAL'" class="mb-4 col-span-2">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="archivo">
              Archivo
            </label>
            <input
              type="file"
              (change)="onFileSelected($event)"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              [ngClass]="{'border-red-500': submitted && !selectedFile}"
            >
            <p *ngIf="selectedFile" class="text-sm text-gray-600 mt-1">
              Archivo seleccionado: {{selectedFile.name}}
            </p>
          </div>

          <div class="mb-4 col-span-2">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="idMaterial">
              Material Relacionado
            </label>
            <select
              formControlName="idMaterial"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="">Seleccione un material (opcional)</option>
              <option *ngFor="let material of materiales" [value]="material.idMaterial">
                {{material.titulo}} ({{material.tipo}})
              </option>
            </select>
          </div>

          <div class="mb-4">
            <label class="flex items-center">
              <input
                formControlName="tieneSolucionario"
                type="checkbox"
                class="form-checkbox h-5 w-5 text-blue-600"
              >
              <span class="ml-2 text-gray-700">Tiene solucionario</span>
            </label>
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
export class EvaluacionFormComponent implements OnInit {
  evaluacionForm: FormGroup;
  editMode = false;
  submitted = false;
  evaluacionId: number | null = null;
  materiales: Material[] = [];
  selectedFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    private evaluacionService: EvaluacionService,
    private materialService: MaterialService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.evaluacionForm = this.fb.group({
      tipo: ['', [Validators.required]],
      nivel: ['', [Validators.required]],
      asignatura: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      tiempoMinutos: ['', [Validators.required, Validators.min(1)]],
      tieneSolucionario: [false],
      tipoRecurso: ['URL', [Validators.required]],
      urlRecurso: [''],
      idMaterial: [null]
    });

    // Actualizar validaciones según el tipo de recurso
    this.evaluacionForm.get('tipoRecurso')?.valueChanges.subscribe(tipo => {
      const urlControl = this.evaluacionForm.get('urlRecurso');
      if (tipo === 'URL') {
        urlControl?.setValidators([Validators.required, Validators.pattern('https?://.+')]);
      } else {
        urlControl?.clearValidators();
      }
      urlControl?.updateValueAndValidity();
    });
  }

  ngOnInit(): void {
    this.cargarMateriales();

    const id = this.route.snapshot.params['id'];
    if (id) {
      this.editMode = true;
      this.evaluacionId = id;
      this.evaluacionService.getEvaluacionById(id)
        .subscribe(evaluacion => {
          this.evaluacionForm.patchValue({
            ...evaluacion,
            tipoRecurso: evaluacion.tipoRecurso || 'URL'
          });
        });
    }
  }

  cargarMateriales(): void {
    this.materialService.getAllMateriales()
      .subscribe(materiales => {
        this.materiales = materiales;
      });
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  get f() { return this.evaluacionForm.controls; }

  onSubmit(): void {
    this.submitted = true;

    if (this.evaluacionForm.invalid || (this.f['tipoRecurso'].value === 'LOCAL' && !this.selectedFile)) {
      return;
    }

    const formData = new FormData();
    const evaluacionData = {
      ...this.evaluacionForm.value,
      fechaCreacion: new Date()
    };

    if (this.f['tipoRecurso'].value === 'LOCAL' && this.selectedFile) {
      formData.append('archivo', this.selectedFile);
      evaluacionData.nombreArchivo = this.selectedFile.name;
      evaluacionData.urlRecurso = null;
    }

    Object.keys(evaluacionData).forEach(key => {
      if (evaluacionData[key] !== null && evaluacionData[key] !== undefined) {
        formData.append(key, evaluacionData[key]);
      }
    });

    if (this.editMode && this.evaluacionId) {
      this.evaluacionService.updateEvaluacion(this.evaluacionId, formData)
        .subscribe(() => this.router.navigate(['/evaluaciones']));
    } else {
      this.evaluacionService.createEvaluacion(formData)
        .subscribe(() => this.router.navigate(['/evaluaciones']));
    }
  }

  onCancel(): void {
    this.router.navigate(['/evaluaciones']);
  }
} 