import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Material } from '../models/material.interface';

@Injectable({
  providedIn: 'root'
})
export class MaterialService {
  private apiUrl = 'http://localhost:8080/api/materiales';

  constructor(private http: HttpClient) { }

  getAllMateriales(): Observable<Material[]> {
    return this.http.get<Material[]>(this.apiUrl);
  }

  getMaterialById(id: number): Observable<Material> {
    return this.http.get<Material>(`${this.apiUrl}/${id}`);
  }

  getMaterialesByTipo(tipo: string): Observable<Material[]> {
    return this.http.get<Material[]>(`${this.apiUrl}/tipo/${tipo}`);
  }

  getMaterialesByNivel(nivel: string): Observable<Material[]> {
    return this.http.get<Material[]>(`${this.apiUrl}/nivel/${nivel}`);
  }

  getMaterialesByArea(area: string): Observable<Material[]> {
    return this.http.get<Material[]>(`${this.apiUrl}/area/${area}`);
  }

  getMaterialesByNucleo(nucleo: string): Observable<Material[]> {
    return this.http.get<Material[]>(`${this.apiUrl}/nucleo/${nucleo}`);
  }

  getMaterialesByAmbito(ambito: string): Observable<Material[]> {
    return this.http.get<Material[]>(`${this.apiUrl}/ambito/${ambito}`);
  }

  getMaterialesByEsDescargable(esDescargable: boolean): Observable<Material[]> {
    return this.http.get<Material[]>(`${this.apiUrl}/descargable/${esDescargable}`);
  }

  getMaterialesByEsEditable(esEditable: boolean): Observable<Material[]> {
    return this.http.get<Material[]>(`${this.apiUrl}/editable/${esEditable}`);
  }

  getMaterialesByIncluyeSolucionario(incluyeSolucionario: boolean): Observable<Material[]> {
    return this.http.get<Material[]>(`${this.apiUrl}/solucionario/${incluyeSolucionario}`);
  }

  getMaterialesByIncluyeDua(incluyeDua: boolean): Observable<Material[]> {
    return this.http.get<Material[]>(`${this.apiUrl}/dua/${incluyeDua}`);
  }

  getMaterialesByEsOnline(esOnline: boolean): Observable<Material[]> {
    return this.http.get<Material[]>(`${this.apiUrl}/online/${esOnline}`);
  }

  searchMaterialesByTitulo(titulo: string): Observable<Material[]> {
    return this.http.get<Material[]>(`${this.apiUrl}/buscar?titulo=${titulo}`);
  }

  createMaterial(material: Material, file?: File): Observable<Material> {
    const formData = new FormData();
    formData.append('material', new Blob([JSON.stringify(material)], { type: 'application/json' }));
    if (file) {
      formData.append('file', file);
    }
    return this.http.post<Material>(this.apiUrl, formData);
  }

  createMaterialWithFormData(formData: FormData): Observable<Material> {
    return this.http.post<Material>(this.apiUrl, formData);
  }

  updateMaterial(id: number, material: Material, file?: File): Observable<Material> {
    const formData = new FormData();
    formData.append('material', new Blob([JSON.stringify(material)], { type: 'application/json' }));
    if (file) {
      formData.append('file', file);
    }
    return this.http.put<Material>(`${this.apiUrl}/${id}`, formData);
  }

  deleteMaterial(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  downloadMaterial(fileName: string) {
    return this.http.get(`${this.apiUrl}/descargar/${fileName}`, { responseType: 'blob' });
  }
} 