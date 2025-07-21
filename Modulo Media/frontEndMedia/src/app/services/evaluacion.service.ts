import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { Evaluacion } from '../models/evaluacion.interface';

// URLs de la API - Railway como principal, local como fallback
const RAILWAY_API_URL = 'https://proyecto-gps-media-backend-production.up.railway.app/api';
const LOCAL_API_URL = 'http://localhost:8080/api';

@Injectable({
  providedIn: 'root'
})
export class EvaluacionService {
  private currentApiUrl = RAILWAY_API_URL;
  private apiUrl = this.currentApiUrl + '/evaluaciones';

  constructor(private http: HttpClient) { }

  // Método para cambiar la URL de la API
  private setApiUrl(url: string) {
    this.currentApiUrl = url;
    this.apiUrl = this.currentApiUrl + '/evaluaciones';
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

  getAllEvaluaciones(): Observable<Evaluacion[]> {
    return this.tryApiCall(() => this.http.get<Evaluacion[]>(this.apiUrl));
  }

  getEvaluacionById(id: number): Observable<Evaluacion> {
    return this.tryApiCall(() => this.http.get<Evaluacion>(`${this.apiUrl}/${id}`));
  }

  getEvaluacionesByTipo(tipo: string): Observable<Evaluacion[]> {
    return this.tryApiCall(() => this.http.get<Evaluacion[]>(`${this.apiUrl}/tipo/${tipo}`));
  }

  getEvaluacionesByNivel(nivel: string): Observable<Evaluacion[]> {
    return this.tryApiCall(() => this.http.get<Evaluacion[]>(`${this.apiUrl}/nivel/${nivel}`));
  }

  getEvaluacionesByAsignatura(asignatura: string): Observable<Evaluacion[]> {
    return this.tryApiCall(() => this.http.get<Evaluacion[]>(`${this.apiUrl}/asignatura/${asignatura}`));
  }

  searchEvaluacionesByTitulo(titulo: string): Observable<Evaluacion[]> {
    return this.tryApiCall(() => this.http.get<Evaluacion[]>(`${this.apiUrl}/buscar?titulo=${titulo}`));
  }

  createEvaluacion(evaluacion: Evaluacion, file?: File): Observable<Evaluacion> {
    const formData = new FormData();
    formData.append('evaluacion', new Blob([JSON.stringify(evaluacion)], { type: 'application/json' }));
    if (file) {
      formData.append('file', file);
    }
    return this.tryApiCall(() => this.http.post<Evaluacion>(this.apiUrl, formData));
  }

  updateEvaluacion(id: number, evaluacion: Evaluacion, file?: File): Observable<Evaluacion> {
    const formData = new FormData();
    formData.append('evaluacion', new Blob([JSON.stringify(evaluacion)], { type: 'application/json' }));
    if (file) {
      formData.append('file', file);
    }
    return this.tryApiCall(() => this.http.put<Evaluacion>(`${this.apiUrl}/${id}`, formData));
  }

  deleteEvaluacion(id: number): Observable<void> {
    return this.tryApiCall(() => this.http.delete<void>(`${this.apiUrl}/${id}`));
  }

  getEvaluacionesByMaterialId(idMaterial: number): Observable<Evaluacion[]> {
    return this.tryApiCall(() => this.http.get<Evaluacion[]>(`${this.apiUrl}/material/${idMaterial}`));
  }
} 