import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MaterialService } from '../../../services/material.service';
import { Material } from '../../../models/material.interface';

@Component({
  selector: 'app-material-form',
  template: `
    <div class="container mx-auto p-4">
      <h2 class="text-2xl font-bold mb-6">{{editMode ? 'Editar' : 'Nuevo'}} Material</h2>
      
      <form [formGroup]="materialForm" (ngSubmit)="onSubmit()" class="max-w-2xl">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="titulo">
              Título
            </label>
            <input
              formControlName="titulo"
              type="text"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              [ngClass]="{'border-red-500': submitted && f['titulo'].errors}"
            >
          </div>

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
              <option value="DOCUMENTO">Documento</option>
              <option value="VIDEO">Video</option>
              <option value="PRESENTACION">Presentación</option>
              <option value="ACTIVIDAD">Actividad</option>
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

          <div class="mb-4">
            <label class="flex items-center">
              <input
                formControlName="esOnline"
                type="checkbox"
                class="form-checkbox h-5 w-5 text-blue-600"
                (change)="onEsOnlineChange($event)"
              >
              <span class="ml-2 text-gray-700">Es recurso online</span>
            </label>
          </div>

          <div class="mb-4 col-span-2" *ngIf="materialForm.get('esOnline')?.value">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="url_descarga">
              URL del Recurso
            </label>
            <input
              formControlName="url_descarga"
              type="url"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              [ngClass]="{'border-red-500': submitted && f['url_descarga'].errors}"
            >
          </div>

          <div class="mb-4 col-span-2" *ngIf="!materialForm.get('esOnline')?.value">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="file">
              Archivo
            </label>
            <div *ngIf="editMode && existingFileUrl" class="mb-2">
              <p class="text-sm text-gray-600">
                Archivo actual: 
                <a [href]="existingFileUrl" target="_blank" class="text-blue-600 hover:underline">{{ getFileName(existingFileUrl) }}</a>
              </p>
              <p class="text-xs text-gray-500">Seleccione un nuevo archivo para reemplazar el actual.</p>
            </div>
            <input
              type="file"
              (change)="onFileSelected($event)"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              [ngClass]="{'border-red-500': submitted && !selectedFile && !editMode}"
            >
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
export class MaterialFormComponent implements OnInit {
  materialForm: FormGroup;
  editMode = false;
  submitted = false;
  materialId: number | null = null;
  selectedFile: File | null = null;
  existingFileUrl: string | null = null;

  constructor(
    private fb: FormBuilder,
    private materialService: MaterialService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.materialForm = this.fb.group({
      titulo: ['', [Validators.required]],
      tipo: ['', [Validators.required]],
      nivel: ['', [Validators.required]],
      asignatura: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      esOnline: [false],
      url_descarga: ['']
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.editMode = true;
      this.materialId = id;
      this.materialService.getMaterialById(id)
        .subscribe(material => {
          this.materialForm.patchValue(material);
          if (material.url_descarga) {
            this.existingFileUrl = material.url_descarga;
          }
        });
    }

    this.onEsOnlineChange();
  }

  get f() { return this.materialForm.controls; }

  onEsOnlineChange(event?: any): void {
    const esOnline = this.materialForm.get('esOnline')?.value;
    const urlDescargaControl = this.materialForm.get('url_descarga');

    if (esOnline) {
      urlDescargaControl?.setValidators([Validators.required, Validators.pattern('https?://.+')]);
    } else {
      urlDescargaControl?.clearValidators();
    }
    urlDescargaControl?.updateValueAndValidity();
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.materialForm.invalid) {
      return;
    }

    const material: Material = {
      ...this.materialForm.value,
      fechaCreacion: new Date()
    };

    if (this.editMode && this.materialId) {
      this.materialService.updateMaterial(this.materialId, material, this.selectedFile || undefined)
        .subscribe(() => this.router.navigate(['/materiales']));
    } else {
      this.materialService.createMaterial(material, this.selectedFile || undefined)
        .subscribe(() => this.router.navigate(['/materiales']));
    }
  }

  onCancel(): void {
    this.router.navigate(['/materiales']);
  }

  getFileName(url: string): string {
    try {
      const parsedUrl = new URL(url);
      const path = parsedUrl.pathname;
      const fileName = path.substring(path.lastIndexOf('/') + 1);
      return decodeURIComponent(fileName);
    } catch (e) {
      return url;
    }
  }
} 