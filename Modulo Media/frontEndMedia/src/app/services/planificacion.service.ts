import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { Planificacion } from '../models/planificacion.interface';

// URLs de la API - Railway como principal, local como fallback
const RAILWAY_API_URL = 'https://proyecto-gps-media-backend-production.up.railway.app/api';
const LOCAL_API_URL = 'http://localhost:8080/api';

@Injectable({
  providedIn: 'root'
})
export class PlanificacionService {
  private currentApiUrl = RAILWAY_API_URL;
  private apiUrl = this.currentApiUrl + '/planificaciones';

  constructor(private http: HttpClient) { }

  // Método para cambiar la URL de la API
  private setApiUrl(url: string) {
    this.currentApiUrl = url;
    this.apiUrl = this.currentApiUrl + '/planificaciones';
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

  getAllPlanificaciones(): Observable<Planificacion[]> {
    return this.tryApiCall(() => this.http.get<Planificacion[]>(this.apiUrl));
  }

  getPlanificacionById(id: number): Observable<Planificacion> {
    return this.tryApiCall(() => this.http.get<Planificacion>(`${this.apiUrl}/${id}`));
  }

  getPlanificacionesByTipo(tipo: string): Observable<Planificacion[]> {
    return this.tryApiCall(() => this.http.get<Planificacion[]>(`${this.apiUrl}/tipo/${tipo}`));
  }

  getPlanificacionesByNivel(nivel: string): Observable<Planificacion[]> {
    return this.tryApiCall(() => this.http.get<Planificacion[]>(`${this.apiUrl}/nivel/${nivel}`));
  }

  getPlanificacionesByAsignatura(asignatura: string): Observable<Planificacion[]> {
    return this.tryApiCall(() => this.http.get<Planificacion[]>(`${this.apiUrl}/asignatura/${asignatura}`));
  }

  searchPlanificacionesByObjetivos(objetivos: string): Observable<Planificacion[]> {
    return this.tryApiCall(() => this.http.get<Planificacion[]>(`${this.apiUrl}/buscar?objetivos=${objetivos}`));
  }

  createPlanificacion(planificacion: Planificacion): Observable<Planificacion> {
    return this.tryApiCall(() => this.http.post<Planificacion>(this.apiUrl, planificacion));
  }

  updatePlanificacion(id: number, planificacion: Planificacion): Observable<Planificacion> {
    return this.tryApiCall(() => this.http.put<Planificacion>(`${this.apiUrl}/${id}`, planificacion));
  }

  deletePlanificacion(id: number): Observable<void> {
    return this.tryApiCall(() => this.http.delete<void>(`${this.apiUrl}/${id}`));
  }
} 