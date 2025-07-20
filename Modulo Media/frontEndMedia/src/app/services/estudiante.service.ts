import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Estudiante, EstudianteDetalle } from '../models/estudiante.interface';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EstudianteService {
  private apiUrl = `${environment.apiUrl}/estudiantes`;

  constructor(private http: HttpClient) { }

  getAllEstudiantes(): Observable<Estudiante[]> {
    return this.http.get<Estudiante[]>(this.apiUrl);
  }

  getEstudianteById(id: number): Observable<EstudianteDetalle> {
    return this.http.get<EstudianteDetalle>(`${this.apiUrl}/${id}`);
  }

  getEstudiantesByNivel(nivel: string): Observable<Estudiante[]> {
    return this.http.get<Estudiante[]>(`${this.apiUrl}/nivel/${nivel}`);
  }

  getEstudiantesByCurso(curso: string): Observable<Estudiante[]> {
    return this.http.get<Estudiante[]>(`${this.apiUrl}/curso/${curso}`);
  }

  createEstudiante(estudiante: Estudiante): Observable<Estudiante> {
    return this.http.post<Estudiante>(this.apiUrl, estudiante);
  }

  updateEstudiante(id: number, estudiante: Estudiante): Observable<Estudiante> {
    return this.http.put<Estudiante>(`${this.apiUrl}/${id}`, estudiante);
  }

  deleteEstudiante(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Métodos para gestión académica
  getEstudiantesInscritosEnCurso(idCurso: number): Observable<Estudiante[]> {
    return this.http.get<Estudiante[]>(`${this.apiUrl}/curso-inscritos/${idCurso}`);
  }

  getEstudiantesPorAsignatura(asignatura: string): Observable<Estudiante[]> {
    return this.http.get<Estudiante[]>(`${this.apiUrl}/asignatura/${asignatura}`);
  }

  // Métodos para búsqueda
  buscarEstudiantes(termino: string): Observable<Estudiante[]> {
    return this.http.get<Estudiante[]>(`${this.apiUrl}/buscar?termino=${termino}`);
  }

  // Métodos para estadísticas
  getEstadisticasEstudiantes(): Observable<{
    totalEstudiantes: number;
    estudiantesPorNivel: {[key: string]: number};
    estudiantesActivos: number;
    estudiantesInactivos: number;
  }> {
    return this.http.get<{
      totalEstudiantes: number;
      estudiantesPorNivel: {[key: string]: number};
      estudiantesActivos: number;
      estudiantesInactivos: number;
    }>(`${this.apiUrl}/estadisticas`);
  }
} 