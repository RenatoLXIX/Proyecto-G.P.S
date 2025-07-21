import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { Material } from '../models/material.interface';

// URLs de la API - Railway como principal, local como fallback
const RAILWAY_API_URL = 'https://proyecto-gps-media-backend-production.up.railway.app/api';
const LOCAL_API_URL = 'http://localhost:8080/api';

@Injectable({
  providedIn: 'root'
})
export class MaterialService {
  private currentApiUrl = RAILWAY_API_URL;
  private apiUrl = this.currentApiUrl + '/materiales';

  constructor(private http: HttpClient) { }

  // Método para cambiar la URL de la API
  private setApiUrl(url: string) {
    this.currentApiUrl = url;
    this.apiUrl = this.currentApiUrl + '/materiales';
  }

  // Método para intentar con Railway primero, luego local
  private tryApiCall<T>(railwayCall: () => Observable<T>): Observable<T> {
    return railwayCall().pipe(
      catchError(railwayError => {
        console.log('Railway falló, intentando con local...', railwayError);
        this.setApiUrl(LOCAL_API_URL);
        return this.http.get<T>(`${LOCAL_API_URL}/database/test`).pipe(
          switchMap(() => {
            console.log('Conexión local exitosa, usando local API');
            return railwayCall().pipe(
              catchError(localError => {
                console.error('Ambas APIs fallaron:', localError);
                return throwError(() => new Error('No se pudo conectar a ninguna API'));
              })
            );
          }),
          catchError(() => {
            console.error('No se pudo conectar a ninguna API');
            return throwError(() => new Error('No se pudo conectar a ninguna API'));
          })
        );
      })
    );
  }

  getAllMateriales(): Observable<Material[]> {
    return this.tryApiCall(() => this.http.get<Material[]>(this.apiUrl));
  }

  getMaterialById(id: number): Observable<Material> {
    return this.tryApiCall(() => this.http.get<Material>(`${this.apiUrl}/${id}`));
  }

  getMaterialesByTipo(tipo: string): Observable<Material[]> {
    return this.tryApiCall(() => this.http.get<Material[]>(`${this.apiUrl}/tipo/${tipo}`));
  }

  getMaterialesByNivel(nivel: string): Observable<Material[]> {
    return this.tryApiCall(() => this.http.get<Material[]>(`${this.apiUrl}/nivel/${nivel}`));
  }

  getMaterialesByAsignatura(asignatura: string): Observable<Material[]> {
    return this.tryApiCall(() => this.http.get<Material[]>(`${this.apiUrl}/asignatura/${asignatura}`));
  }

  getMaterialesByEsOnline(esOnline: boolean): Observable<Material[]> {
    return this.tryApiCall(() => this.http.get<Material[]>(`${this.apiUrl}/online/${esOnline}`));
  }

  searchMaterialesByTitulo(titulo: string): Observable<Material[]> {
    return this.tryApiCall(() => this.http.get<Material[]>(`${this.apiUrl}/buscar?titulo=${titulo}`));
  }

  createMaterial(material: Material, file?: File): Observable<Material> {
    const formData = new FormData();
    formData.append('material', new Blob([JSON.stringify(material)], { type: 'application/json' }));
    if (file) {
      formData.append('file', file);
    }
    return this.tryApiCall(() => this.http.post<Material>(this.apiUrl, formData));
  }

  updateMaterial(id: number, material: Material, file?: File): Observable<Material> {
    const formData = new FormData();
    formData.append('material', new Blob([JSON.stringify(material)], { type: 'application/json' }));
    if (file) {
      formData.append('file', file);
    }
    return this.tryApiCall(() => this.http.put<Material>(`${this.apiUrl}/${id}`, formData));
  }

  deleteMaterial(id: number): Observable<void> {
    return this.tryApiCall(() => this.http.delete<void>(`${this.apiUrl}/${id}`));
  }

  downloadMaterial(fileName: string): Observable<Blob> {
    return this.tryApiCall(() => this.http.get(`${this.currentApiUrl}/files/${fileName}`, { responseType: 'blob' }));
  }
} 