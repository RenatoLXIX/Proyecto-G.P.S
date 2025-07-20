import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Curso } from '../models/curso.interface';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CursoService {
  private apiUrl = `${environment.apiUrl}/cursos`;

  constructor(private http: HttpClient) { }

  getAllCursos(): Observable<Curso[]> {
    return this.http.get<Curso[]>(this.apiUrl);
  }

  getCursoById(id: number): Observable<Curso> {
    return this.http.get<Curso>(`${this.apiUrl}/${id}`);
  }

  getCursosByNivel(nivel: string): Observable<Curso[]> {
    return this.http.get<Curso[]>(`${this.apiUrl}/nivel/${nivel}`);
  }

  getCursosByAsignatura(asignatura: string): Observable<Curso[]> {
    return this.http.get<Curso[]>(`${this.apiUrl}/asignatura/${asignatura}`);
  }

  getCursosByProfesor(profesor: string): Observable<Curso[]> {
    return this.http.get<Curso[]>(`${this.apiUrl}/profesor/${profesor}`);
  }

  createCurso(curso: Curso): Observable<Curso> {
    return this.http.post<Curso>(this.apiUrl, curso);
  }

  updateCurso(id: number, curso: Curso): Observable<Curso> {
    return this.http.put<Curso>(`${this.apiUrl}/${id}`, curso);
  }

  deleteCurso(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Métodos para estudiantes
  getCursosInscritosEstudiante(idEstudiante: number): Observable<Curso[]> {
    return this.http.get<Curso[]>(`${this.apiUrl}/estudiante/${idEstudiante}`);
  }

  inscribirEstudianteEnCurso(idEstudiante: number, idCurso: number): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/${idCurso}/inscribir/${idEstudiante}`, {});
  }

  desinscribirEstudianteDeCurso(idEstudiante: number, idCurso: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${idCurso}/desinscribir/${idEstudiante}`);
  }
} 