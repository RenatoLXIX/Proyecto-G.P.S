import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  currentPage = 'home';

  // Datos para HU1: Reportes
  comunas = ['Santiago', 'Providencia', 'Las Condes', 'Ñuñoa'];
  filtrosReportes = {
    comuna: '',
    anio: 2024,
    tipo: 'matricula'
  };
  reporteGenerado = false;
  datosReporte = [
    { establecimiento: 'Escuela A', valor: 450, variacion: 5 },
    { establecimiento: 'Escuela B', valor: 320, variacion: -2 }
  ];

  // Datos para HU2: Estado
  establecimientos = ['Escuela X', 'Liceo Y', 'Colegio Z'];
  filtrosEstado = {
    establecimiento: '',
    indicador: 'asistencia'
  };

  // Datos para HU3: Búsqueda
  terminoBusqueda = '';
  filtrosBusqueda = {
    alumnos: true,
    apoderados: true,
    profesores: true
  };
  resultadosBusqueda = [
    { nombre: 'Juan Pérez', rut: '12.345.678-9', rol: 'Apoderado', establecimiento: 'Escuela X' },
    { nombre: 'Ana Gómez', rut: '23.456.789-0', rol: 'Profesora', establecimiento: 'Liceo Y' }
  ];

  // Datos para HU4: Mensajería
  mensaje = {
    destinatario: ['todos'],
    asunto: '',
    contenido: ''
  };
  listaAlumnos = [
    { nombre: 'Carlos López', curso: '4°B', seleccionado: false },
    { nombre: 'Fernanda Martínez', curso: '5°A', seleccionado: false },
    { nombre: 'Diego Rojas', curso: '3°C', seleccionado: false }
  ];

  constructor(private router: Router) {
    this.router.events.subscribe(() => {
      this.currentPage = this.router.url.split('/')[1] || 'home';
    });
  }

  navigate(page: string) {
    this.router.navigate([page]);
  }

  generarReporte() {
    this.reporteGenerado = true;
    // Lógica para generar reporte con filtros
  }

  getTituloColumna() {
    switch(this.filtrosReportes.tipo) {
      case 'extranjeros': return 'Alumnos Extranjeros';
      case 'repitencias': return 'Repitencias';
      default: return 'Matrícula Total';
    }
  }

  buscar() {
    // Lógica de búsqueda simulada
    console.log('Buscando:', this.terminoBusqueda, this.filtrosBusqueda);
  }

  enviarMensaje() {
    // Obtener alumnos seleccionados
    const alumnosSeleccionados = this.listaAlumnos
      .filter(alumno => alumno.seleccionado)
      .map(alumno => alumno.nombre);

    // Preparar datos del mensaje
    const datosEnvio = {
      ...this.mensaje,
      alumnosSeleccionados: alumnosSeleccionados,
      fecha: new Date().toISOString()
    };

    // Simular envío (en producción sería una llamada HTTP)
    console.log('Mensaje a enviar:', datosEnvio);
    alert(`Mensaje enviado a: ${this.mensaje.destinatario.join(', ')}\nAsunto: ${this.mensaje.asunto}`);

    // Resetear formulario
    this.mensaje = {
      destinatario: ['todos'],
      asunto: '',
      contenido: ''
    };
    this.listaAlumnos.forEach(alumno => alumno.seleccionado = false);
  }

  toggleSeleccionTodos() {
    const todosSeleccionados = this.mensaje.destinatario.includes('todos');
    if (todosSeleccionados) {
      this.mensaje.destinatario = ['todos'];
    }
  }
}