import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // Método genérico para GET
  get<T>(endpoint: string) {
    return this.http.get<T>(`${this.baseUrl}${endpoint}`);
  }

  // Método genérico para POST
  post<T>(endpoint: string, data: any) {
    return this.http.post<T>(`${this.baseUrl}${endpoint}`, data);
  }

  // Método genérico para PUT
  put<T>(endpoint: string, data: any) {
    return this.http.put<T>(`${this.baseUrl}${endpoint}`, data);
  }

  // Método genérico para DELETE
  delete<T>(endpoint: string) {
    return this.http.delete<T>(`${this.baseUrl}${endpoint}`);
  }
} 