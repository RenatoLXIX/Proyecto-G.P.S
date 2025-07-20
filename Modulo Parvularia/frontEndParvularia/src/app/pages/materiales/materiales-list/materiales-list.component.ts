import { Component, OnInit } from '@angular/core';
import { MaterialService } from '../../../services/material.service';
import { Material } from '../../../models/material.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-materiales-list',
  template: `
    <div class="container mx-auto p-4">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-2xl font-bold">Materiales Educativos Parvularia</h2>
        <a routerLink="/home" class="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700">
          Volver al Inicio
        </a>
      </div>

      <!-- Filtros -->
      <div class="mb-6 bg-white rounded-lg shadow-md p-4">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Nivel</label>
            <select [(ngModel)]="filtroNivel" (change)="aplicarFiltros()" class="w-full border border-gray-300 rounded-md px-3 py-2">
              <option value="">Todos los niveles</option>
              <option value="MEDIO_MENOR">Medio Menor</option>
              <option value="MEDIO_MAYOR">Medio Mayor</option>
              <option value="PRE_KINDER">Pre-Kinder</option>
              <option value="KINDER">Kinder</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Área</label>
            <select [(ngModel)]="filtroArea" (change)="aplicarFiltros()" class="w-full border border-gray-300 rounded-md px-3 py-2">
              <option value="">Todas las áreas</option>
              <option value="LENGUAJE">Lenguaje</option>
              <option value="MATEMATICAS">Matemáticas</option>
              <option value="APOYO_PSICOLOGICO">Apoyo Psicológico</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Tipo</label>
            <select [(ngModel)]="filtroTipo" (change)="aplicarFiltros()" class="w-full border border-gray-300 rounded-md px-3 py-2">
              <option value="">Todos los tipos</option>
              <option value="MATERIAL_VISUAL">Material Visual</option>
              <option value="APUNTES">Apuntes</option>
              <option value="GUIA">Guía</option>
              <option value="ACTIVIDAD">Actividad</option>
              <option value="VIDEO">Video</option>
              <option value="SOLUCIONARIO">Solucionario</option>
            </select>
          </div>
        </div>
      </div>

      <div class="mb-6">
        <a routerLink="nuevo" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Nuevo Material
        </a>
      </div>

      <div *ngIf="materialesFiltrados.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div *ngFor="let material of materialesFiltrados" 
             class="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 border border-gray-100 min-h-[320px] flex flex-col">
          <div class="flex-grow">
            <h3 class="text-xl font-bold mb-3 text-gray-800">{{material.titulo}}</h3>
            <p class="text-gray-600 mb-4 line-clamp-3">{{material.descripcion}}</p>
            
            <!-- Tags -->
            <div class="flex flex-wrap gap-2 mb-4">
              <span class="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full font-medium">{{formatTag(material.tipo)}}</span>
              <span class="bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full font-medium">{{formatTag(material.nivel)}}</span>
              <span class="bg-purple-100 text-purple-800 text-sm px-3 py-1 rounded-full font-medium">{{formatTag(material.area)}}</span>
              <span *ngIf="material.esDescargable" class="bg-red-100 text-red-800 text-sm px-3 py-1 rounded-full font-medium">Descargable</span>
            </div>

            <!-- Información adicional -->
            <div class="text-sm text-gray-500 space-y-1">
              <div *ngIf="material.nucleo">
                <strong>Núcleo:</strong> {{material.nucleo}}
              </div>
              <div *ngIf="material.eje">
                <strong>Eje:</strong> {{material.eje}}
              </div>
              <div *ngIf="material.ambito">
                <strong>Ámbito:</strong> {{material.ambito}}
              </div>
              <div *ngIf="material.objetivoAprendizaje">
                <strong>OA:</strong> {{material.objetivoAprendizaje}}
              </div>
            </div>
          </div>
          
          <div class="mt-auto pt-4 border-t border-gray-100">
            <div class="flex justify-between items-center">
              <div class="space-x-2">
                <button *ngIf="material.idMaterial"
                        (click)="editarMaterial(material.idMaterial)" 
                        class="text-yellow-600 hover:text-yellow-800 p-2 rounded-lg hover:bg-yellow-50 transition-colors"
                        title="Editar material">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                  </svg>
                </button>
                <button *ngIf="material.idMaterial"
                        (click)="eliminarMaterial(material.idMaterial)" 
                        class="text-red-600 hover:text-red-800 p-2 rounded-lg hover:bg-red-50 transition-colors"
                        title="Eliminar material">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                  </svg>
                </button>
              </div>
              <button (click)="descargarMaterial(material)" 
                     class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                Descargar
              </button>
            </div>
          </div>
        </div>
      </div>

      <div *ngIf="materialesFiltrados.length === 0" class="text-center py-12">
        <div class="bg-gray-50 rounded-xl p-8 border-2 border-dashed border-gray-300">
          <svg class="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <h3 class="text-lg font-medium text-gray-900 mb-2">No hay materiales disponibles</h3>
          <p class="text-gray-500 mb-4">No se encontraron materiales con los filtros aplicados.</p>
          <a routerLink="nuevo" class="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
            </svg>
            Crear material
          </a>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class MaterialesListComponent implements OnInit {
  materiales: Material[] = [];
  materialesFiltrados: Material[] = [];
  
  // Filtros
  filtroNivel: string = '';
  filtroArea: string = '';
  filtroTipo: string = '';

  constructor(
    private materialService: MaterialService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarMateriales();
  }

  cargarMateriales(): void {
    this.materialService.getAllMateriales()
      .subscribe(materiales => {
        this.materiales = materiales;
        this.aplicarFiltros();
      });
  }

  aplicarFiltros(): void {
    this.materialesFiltrados = this.materiales.filter(material => {
      const cumpleNivel = !this.filtroNivel || material.nivel === this.filtroNivel;
      const cumpleArea = !this.filtroArea || material.area === this.filtroArea;
      const cumpleTipo = !this.filtroTipo || material.tipo === this.filtroTipo;
      
      return cumpleNivel && cumpleArea && cumpleTipo;
    });
  }

  editarMaterial(id: number): void {
    this.router.navigate(['/materiales/editar', id]);
  }

  eliminarMaterial(id: number): void {
    if (confirm('¿Está seguro de que desea eliminar este material?')) {
      this.materialService.deleteMaterial(id)
        .subscribe(() => {
          this.materiales = this.materiales.filter(m => m.idMaterial !== id);
          this.aplicarFiltros();
        });
    }
  }

  descargarMaterial(material: Material): void {
    if (!material.url_descarga) {
      alert('No hay archivo disponible para descargar');
      return;
    }

    const fileName = material.url_descarga.split('/').pop();
    if (!fileName) {
      alert('Error al obtener el nombre del archivo');
      return;
    }

    this.materialService.downloadMaterial(fileName)
      .subscribe(blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${material.titulo}${this.getFileExtension(fileName)}`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      });
  }

  private getFileExtension(fileName: string): string {
    const match = fileName.match(/\.[0-9a-z]+$/i);
    return match ? match[0] : '';
  }

  formatTag(tag: string): string {
    return tag.replace(/_/g, ' ');
  }
} 