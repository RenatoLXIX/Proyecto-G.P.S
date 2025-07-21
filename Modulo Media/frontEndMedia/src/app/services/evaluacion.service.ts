import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Evaluacion } from '../models/evaluacion.interface';

// TODO: Migrar a environment cuando esté disponible
const API_BASE_URL = 'https://proyecto-gps-media-backend-production.up.railway.app/api';

@Injectable({
  providedIn: 'root'
})
export class EvaluacionService {
  private apiUrl = API_BASE_URL + '/evaluaciones';

  constructor(private http: HttpClient) { }

  getAllEvaluaciones(): Observable<Evaluacion[]> {
    return this.http.get<Evaluacion[]>(this.apiUrl);
  }

  getEvaluacionById(id: number): Observable<Evaluacion> {
    return this.http.get<Evaluacion>(`${this.apiUrl}/${id}`);
  }

  getEvaluacionesByTipo(tipo: string): Observable<Evaluacion[]> {
    return this.http.get<Evaluacion[]>(`${this.apiUrl}/tipo/${tipo}`);
  }

  getEvaluacionesByNivel(nivel: string): Observable<Evaluacion[]> {
    return this.http.get<Evaluacion[]>(`${this.apiUrl}/nivel/${nivel}`);
  }

  getEvaluacionesByAsignatura(asignatura: string): Observable<Evaluacion[]> {
    return this.http.get<Evaluacion[]>(`${this.apiUrl}/asignatura/${asignatura}`);
  }

  getEvaluacionesByTieneSolucionario(tieneSolucionario: boolean): Observable<Evaluacion[]> {
    return this.http.get<Evaluacion[]>(`${this.apiUrl}/solucionario/${tieneSolucionario}`);
  }

  getEvaluacionesByTiempoMenorA(tiempoMinutos: number): Observable<Evaluacion[]> {
    return this.http.get<Evaluacion[]>(`${this.apiUrl}/tiempo-menor?tiempoMinutos=${tiempoMinutos}`);
  }

  getEvaluacionesByMaterialId(idMaterial: number): Observable<Evaluacion[]> {
    return this.http.get<Evaluacion[]>(`${this.apiUrl}/material/${idMaterial}`);
  }

  createEvaluacion(evaluacion: FormData): Observable<Evaluacion> {
    return this.http.post<Evaluacion>(this.apiUrl, evaluacion);
  }

  updateEvaluacion(id: number, evaluacion: FormData): Observable<Evaluacion> {
    return this.http.put<Evaluacion>(`${this.apiUrl}/${id}`, evaluacion);
  }

  deleteEvaluacion(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
} 