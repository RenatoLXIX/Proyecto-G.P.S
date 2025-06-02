import { Component, OnInit } from '@angular/core';
import { MaterialService } from '../../../services/material.service';
import { Material } from '../../../models/material.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-materiales-list',
  template: `
    <div class="container mx-auto p-4">
      <div class="flex justify-between items-center mb-6">
        <div class="flex items-center space-x-4">
          <a routerLink="/home" class="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700">
            Volver al Inicio
          </a>
          <h2 class="text-2xl font-bold">Materiales Educativos</h2>
        </div>
        <a routerLink="nuevo" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Nuevo Material
        </a>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div *ngFor="let material of materiales" 
             class="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
          <h3 class="text-xl font-semibold mb-2">{{material.titulo}}</h3>
          <p class="text-gray-600 mb-2">{{material.descripcion}}</p>
          <div class="flex gap-2 mb-2">
            <span class="bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded">{{material.tipo}}</span>
            <span class="bg-green-100 text-green-800 text-sm px-2 py-1 rounded">{{material.nivel}}</span>
            <span class="bg-purple-100 text-purple-800 text-sm px-2 py-1 rounded">{{material.asignatura}}</span>
          </div>
          <div class="flex justify-start items-center mt-4 space-x-4">
            <div class="space-x-2">
              <button *ngIf="material.idMaterial"
                      (click)="editarMaterial(material.idMaterial)" 
                      class="text-yellow-600 hover:text-yellow-800">
                Editar
              </button>
              <button *ngIf="material.idMaterial"
                      (click)="eliminarMaterial(material.idMaterial)" 
                      class="text-red-600 hover:text-red-800">
                Eliminar
              </button>
            </div>
            <button (click)="descargarMaterial(material)" 
                   class="text-blue-600 hover:text-blue-800">
              Descargar Material
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class MaterialesListComponent implements OnInit {
  materiales: Material[] = [];

  constructor(
    private materialService: MaterialService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarMateriales();
  }

  cargarMateriales(): void {
    this.materialService.getAllMateriales()
      .subscribe(materiales => this.materiales = materiales);
  }

  editarMaterial(id: number): void {
    this.router.navigate(['/materiales/editar', id]);
  }

  eliminarMaterial(id: number): void {
    if (confirm('¿Está seguro de que desea eliminar este material?')) {
      this.materialService.deleteMaterial(id)
        .subscribe(() => {
          this.materiales = this.materiales.filter(m => m.idMaterial !== id);
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
} 