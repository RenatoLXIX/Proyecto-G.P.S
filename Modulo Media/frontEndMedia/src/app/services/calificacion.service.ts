import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Calificacion, CalificacionEstudiante } from '../models/calificacion.interface';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CalificacionService {
  private apiUrl = `${environment.apiUrl}/calificaciones`;

  constructor(private http: HttpClient) { }

  getAllCalificaciones(): Observable<Calificacion[]> {
    return this.http.get<Calificacion[]>(this.apiUrl);
  }

  getCalificacionById(id: number): Observable<Calificacion> {
    return this.http.get<Calificacion>(`${this.apiUrl}/${id}`);
  }

  getCalificacionesByEstudiante(idEstudiante: number): Observable<CalificacionEstudiante[]> {
    return this.http.get<CalificacionEstudiante[]>(`${this.apiUrl}/estudiante/${idEstudiante}`);
  }

  getCalificacionesByCurso(idCurso: number): Observable<Calificacion[]> {
    return this.http.get<Calificacion[]>(`${this.apiUrl}/curso/${idCurso}`);
  }

  getCalificacionesByAsignatura(idEstudiante: number, asignatura: string): Observable<CalificacionEstudiante[]> {
    return this.http.get<CalificacionEstudiante[]>(`${this.apiUrl}/estudiante/${idEstudiante}/asignatura/${asignatura}`);
  }

  createCalificacion(calificacion: Calificacion): Observable<Calificacion> {
    return this.http.post<Calificacion>(this.apiUrl, calificacion);
  }

  updateCalificacion(id: number, calificacion: Calificacion): Observable<Calificacion> {
    return this.http.put<Calificacion>(`${this.apiUrl}/${id}`, calificacion);
  }

  deleteCalificacion(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Métodos para promedios y estadísticas
  getPromedioEstudiante(idEstudiante: number): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/estudiante/${idEstudiante}/promedio`);
  }

  getPromedioPorAsignatura(idEstudiante: number): Observable<{[key: string]: number}> {
    return this.http.get<{[key: string]: number}>(`${this.apiUrl}/estudiante/${idEstudiante}/promedio-asignatura`);
  }

  getEstadisticasEstudiante(idEstudiante: number): Observable<{
    promedioGeneral: number;
    totalEvaluaciones: number;
    asignaturasInscritas: string[];
    calificacionesRecientes: CalificacionEstudiante[];
  }> {
    return this.http.get<{
      promedioGeneral: number;
      totalEvaluaciones: number;
      asignaturasInscritas: string[];
      calificacionesRecientes: CalificacionEstudiante[];
    }>(`${this.apiUrl}/estudiante/${idEstudiante}/estadisticas`);
  }

  // Métodos para profesores
  getCalificacionesByEvaluacion(idEvaluacion: number): Observable<Calificacion[]> {
    return this.http.get<Calificacion[]>(`${this.apiUrl}/evaluacion/${idEvaluacion}`);
  }

  calificarEstudiante(calificacion: Calificacion): Observable<Calificacion> {
    return this.http.post<Calificacion>(`${this.apiUrl}/calificar`, calificacion);
  }

  actualizarCalificacionMasiva(calificaciones: Calificacion[]): Observable<Calificacion[]> {
    return this.http.put<Calificacion[]>(`${this.apiUrl}/actualizar-masivo`, calificaciones);
  }
} 