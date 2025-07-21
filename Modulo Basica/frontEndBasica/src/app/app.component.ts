import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  planificaciones: any[] = [];
  recursos: any[] = [];
  materiales: any[] = [];
  isLoading = true;
  errorMessage = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    // Cargar planificaciones
    this.http.get<any[]>('http://localhost:8080/api/planificaciones').subscribe({
      next: (data) => {
        console.log('Planificaciones:', data);
        this.planificaciones = data;
      },
      error: (err) => {
        console.error('Error planificaciones:', err);
        this.errorMessage = 'Error cargando planificaciones';
      }
    });

    // Cargar recursos
    this.http.get<any[]>('http://localhost:8080/api/recursos').subscribe({
      next: (data) => {
        console.log('Recursos:', data);
        this.recursos = data;
      },
      error: (err) => {
        console.error('Error recursos:', err);
        this.errorMessage = 'Error cargando recursos';
      }
    });

    // Cargar materiales
    this.http.get<any[]>('http://localhost:8080/api/materiales').subscribe({
      next: (data) => {
        console.log('Materiales:', data);
        this.materiales = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error materiales:', err);
        this.errorMessage = 'Error cargando materiales';
        this.isLoading = false;
      }
    });
  }
}