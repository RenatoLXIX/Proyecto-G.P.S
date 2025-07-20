import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MaterialService } from '../../../services/material.service';
import { Material } from '../../../models/material.interface';

@Component({
  selector: 'app-material-form',
  template: `
    <div class="max-w-4xl mx-auto">
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-3xl font-bold text-gray-900">{{ editMode ? 'Editar' : 'Nuevo' }} Material</h1>
        <a routerLink="../" class="text-blue-600 hover:text-blue-800">← Volver</a>
      </div>

      <form [formGroup]="materialForm" (ngSubmit)="onSubmit()" class="bg-white rounded-lg shadow-md p-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Título -->
          <div class="md:col-span-2">
            <label class="block text-sm font-medium text-gray-700 mb-2">Título *</label>
            <input formControlName="titulo" type="text" 
                   class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <div *ngIf="materialForm.get('titulo')?.invalid && materialForm.get('titulo')?.touched" class="text-red-600 text-xs mt-1">Este campo es obligatorio.</div>
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
            <div *ngIf="materialForm.get('nivel')?.invalid && materialForm.get('nivel')?.touched" class="text-red-600 text-xs mt-1">Este campo es obligatorio.</div>
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
            <div *ngIf="materialForm.get('area')?.invalid && materialForm.get('area')?.touched" class="text-red-600 text-xs mt-1">Este campo es obligatorio.</div>
          </div>

          <!-- Tipo -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Tipo *</label>
            <select formControlName="tipo" 
                    class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">Seleccione un tipo</option>
              <option value="APUNTE">Apunte</option>
              <option value="GUIA">Guía</option>
              <option value="ACTIVIDAD">Actividad</option>
              <option value="VIDEO">Video</option>
              <option value="SOLUCIONARIO">Solucionario</option>
              <option value="PLANIFICACION">Planificación</option>
            </select>
            <div *ngIf="materialForm.get('tipo')?.invalid && materialForm.get('tipo')?.touched" class="text-red-600 text-xs mt-1">Este campo es obligatorio.</div>
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

          <!-- Ámbito -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Ámbito (opcional)</label>
            <input formControlName="ambito" type="text" 
                   class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
          </div>

          <!-- Objetivo de Aprendizaje -->
          <div class="md:col-span-2">
            <label class="block text-sm font-medium text-gray-700 mb-2">Objetivo de Aprendizaje *</label>
            <textarea formControlName="objetivoAprendizaje" rows="3" 
                      class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
            <div *ngIf="materialForm.get('objetivoAprendizaje')?.invalid && materialForm.get('objetivoAprendizaje')?.touched" class="text-red-600 text-xs mt-1">Este campo es obligatorio.</div>
          </div>

          <!-- Descripción -->
          <div class="md:col-span-2">
            <label class="block text-sm font-medium text-gray-700 mb-2">Descripción *</label>
            <textarea formControlName="descripcion" rows="4" 
                      class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
            <div *ngIf="materialForm.get('descripcion')?.invalid && materialForm.get('descripcion')?.touched" class="text-red-600 text-xs mt-1">Este campo es obligatorio.</div>
          </div>

          <!-- Checkboxes -->
          <div class="md:col-span-2">
            <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
              <label class="flex items-center">
                <input formControlName="esOnline" type="checkbox" class="mr-2">
                <span class="text-sm">Es online (opcional)</span>
              </label>
              <label class="flex items-center">
                <input formControlName="esDescargable" type="checkbox" class="mr-2">
                <span class="text-sm">Es descargable (opcional)</span>
              </label>
              <label class="flex items-center">
                <input formControlName="esEditable" type="checkbox" class="mr-2">
                <span class="text-sm">Es editable (opcional)</span>
              </label>
              <label class="flex items-center">
                <input formControlName="incluyeSolucionario" type="checkbox" class="mr-2">
                <span class="text-sm">Incluye solucionario (opcional)</span>
              </label>
            </div>
          </div>

          <!-- URL o Archivo -->
          <div class="md:col-span-2">
            <div *ngIf="materialForm.get('esOnline')?.value">
              <label class="block text-sm font-medium text-gray-700 mb-2">URL del Recurso *</label>
              <input formControlName="url_descarga" type="url" 
                     class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
            </div>
            
            <div *ngIf="!materialForm.get('esOnline')?.value">
              <label class="block text-sm font-medium text-gray-700 mb-2">Archivo</label>
              <input type="file" (change)="onFileSelected($event)" 
                     class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
            </div>
          </div>
        </div>

        <!-- Botones -->
        <div class="flex justify-end space-x-4 mt-6">
          <button type="button" (click)="onCancel()" 
                  class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
            Cancelar
          </button>
          <button type="submit" 
                  class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            {{ editMode ? 'Actualizar' : 'Crear' }}
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
  materialId: number | null = null;
  selectedFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    private materialService: MaterialService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.materialForm = this.fb.group({
      titulo: ['', [Validators.required]],
      nivel: ['', [Validators.required]],
      area: ['', [Validators.required]],
      tipo: ['', [Validators.required]],
      nucleo: [''], // opcional
      eje: [''], // opcional
      ambito: [''], // opcional
      objetivoAprendizaje: ['', [Validators.required]], // ahora obligatorio
      descripcion: ['', [Validators.required]],
      esOnline: [false], // opcional
      esDescargable: [true], // opcional
      esEditable: [true], // opcional
      incluyeSolucionario: [false], // opcional
      incluyeDua: [false],
      principioDua: [''],
      articuloDua: [''],
      url_descarga: ['']
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.editMode = true;
      this.materialId = id;
      this.materialService.getMaterialById(id).subscribe(material => {
        this.materialForm.patchValue(material);
      });
    }
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  onSubmit(): void {
    if (this.materialForm.valid) {
      const material: Material = {
        ...this.materialForm.value,
        fechaCreacion: new Date()
      };

      // Si no es online, limpiar url_descarga
      if (!material.esOnline) {
        material.url_descarga = '';
      }

      const formData = new FormData();
      formData.append('material', new Blob([JSON.stringify(material)], { type: 'application/json' }));
      if (this.selectedFile) {
        formData.append('file', this.selectedFile);
      }

      if (this.editMode && this.materialId) {
        this.materialService.updateMaterial(this.materialId, material, this.selectedFile || undefined)
          .subscribe(() => this.router.navigate(['/materiales']));
      } else {
        this.materialService.createMaterialWithFormData(formData)
          .subscribe(() => this.router.navigate(['/materiales']));
      }
    }
  }

  onCancel(): void {
    this.router.navigate(['/materiales']);
  }
} 