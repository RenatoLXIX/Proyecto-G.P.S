import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Planificacion } from '../models/planificacion.interface';

@Injectable({
  providedIn: 'root'
})
export class PlanificacionService {
  private apiUrl = 'http://localhost:8080/api/planificaciones';

  constructor(private http: HttpClient) { }

  getAllPlanificaciones(): Observable<Planificacion[]> {
    return this.http.get<Planificacion[]>(this.apiUrl);
  }

  getPlanificacionById(id: number): Observable<Planificacion> {
    return this.http.get<Planificacion>(`${this.apiUrl}/${id}`);
  }

  getPlanificacionesByTipo(tipo: string): Observable<Planificacion[]> {
    return this.http.get<Planificacion[]>(`${this.apiUrl}/tipo/${tipo}`);
  }

  getPlanificacionesByNivel(nivel: string): Observable<Planificacion[]> {
    return this.http.get<Planificacion[]>(`${this.apiUrl}/nivel/${nivel}`);
  }

  getPlanificacionesByAsignatura(asignatura: string): Observable<Planificacion[]> {
    return this.http.get<Planificacion[]>(`${this.apiUrl}/asignatura/${asignatura}`);
  }

  searchPlanificacionesByObjetivos(objetivos: string): Observable<Planificacion[]> {
    return this.http.get<Planificacion[]>(`${this.apiUrl}/buscar?objetivos=${objetivos}`);
  }

  createPlanificacion(planificacion: Planificacion): Observable<Planificacion> {
    return this.http.post<Planificacion>(this.apiUrl, planificacion);
  }

  updatePlanificacion(id: number, planificacion: Planificacion): Observable<Planificacion> {
    return this.http.put<Planificacion>(`${this.apiUrl}/${id}`, planificacion);
  }

  deletePlanificacion(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
} 