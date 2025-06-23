import { Component, OnInit } from '@angular/core';
import { MaterialService } from '../../../services/material.service';
import { Material } from '../../../models/material.interface';
import { Router } from '@angular/router';
import { RoleService } from '../../../services/role.service';
import { UserType } from '../../../models/user-type.model';

@Component({
  selector: 'app-materiales-list',
  template: `
    <div class="container mx-auto p-4">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-2xl font-bold">Materiales Educativos</h2>
        <a routerLink="/home" class="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700">
          Volver al Inicio
        </a>
      </div>

      <div class="mb-6">
        <a *ngIf="canCreate()" routerLink="nuevo" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Nuevo Material
        </a>
      </div>

      <div *ngIf="materiales.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div *ngFor="let material of materiales" 
             class="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 border border-gray-100 min-h-[280px] flex flex-col">
          <div class="flex-grow">
            <h3 class="text-xl font-bold mb-3 text-gray-800">{{material.titulo}}</h3>
            <p class="text-gray-600 mb-4 line-clamp-3">{{material.descripcion}}</p>
            <div class="flex flex-wrap gap-2 mb-4">
              <span class="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full font-medium">{{material.tipo}}</span>
              <span class="bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full font-medium">{{material.nivel}}</span>
              <span class="bg-purple-100 text-purple-800 text-sm px-3 py-1 rounded-full font-medium">{{material.asignatura}}</span>
            </div>
          </div>
          <div class="mt-auto pt-4 border-t border-gray-100">
            <div class="flex justify-between items-center">
              <div class="space-x-2">
                <button *ngIf="material.idMaterial && canCreate()"
                        (click)="editarMaterial(material.idMaterial)" 
                        class="text-yellow-600 hover:text-yellow-800 font-medium text-sm">
                  Editar
                </button>
                <button *ngIf="material.idMaterial && canCreate()"
                        (click)="eliminarMaterial(material.idMaterial)" 
                        class="text-red-600 hover:text-red-800 font-medium text-sm">
                  Eliminar
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

      <div *ngIf="materiales.length === 0" class="text-center py-12">
        <div class="bg-gray-50 rounded-xl p-8 border-2 border-dashed border-gray-300">
          <svg class="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <h3 class="text-lg font-medium text-gray-900 mb-2">No hay materiales disponibles</h3>
          <p class="text-gray-500 mb-4">Aún no se han agregado materiales educativos a esta sección.</p>
          <a *ngIf="canCreate()" routerLink="nuevo" class="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
            </svg>
            Crear primer material
          </a>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class MaterialesListComponent implements OnInit {
  materiales: Material[] = [];
  userType?: UserType;

  constructor(
    private materialService: MaterialService,
    private router: Router,
    private roleService: RoleService
  ) {}

  ngOnInit(): void {
    this.cargarMateriales();
    this.roleService.selectedRole$.subscribe(role => {
      this.userType = role;
    });
  }

  canCreate(): boolean {
    return this.userType === UserType.ADMINISTRADOR || this.userType === UserType.PROFESOR;
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