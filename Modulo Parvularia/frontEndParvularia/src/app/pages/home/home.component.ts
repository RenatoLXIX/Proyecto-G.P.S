import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MaterialService } from '../../services/material.service';
import { PlanificacionService } from '../../services/planificacion.service';
import { Material } from '../../models/material.interface';
import { Planificacion } from '../../models/planificacion.interface';

enum NivelEducativo {
  MEDIO_MENOR = 'MEDIO_MENOR',
  MEDIO_MAYOR = 'MEDIO_MAYOR',
  PRE_KINDER = 'PRE_KINDER',
  KINDER = 'KINDER'
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  currentNivel: NivelEducativo = NivelEducativo.MEDIO_MENOR;
  
  nivelValues = Object.values(NivelEducativo);
  nivelLabels: { [key: string]: string } = {
    [NivelEducativo.MEDIO_MENOR]: 'Medio Menor',
    [NivelEducativo.MEDIO_MAYOR]: 'Medio Mayor',
    [NivelEducativo.PRE_KINDER]: 'Pre-Kinder',
    [NivelEducativo.KINDER]: 'Kinder'
  };

  // Datos de materiales
  materialesRecientes: Material[] = [];
  totalMateriales: number = 0;
  materialesLenguaje: number = 0;
  materialesMatematicas: number = 0;
  materialesPsicologico: number = 0;
  materialesMedio: number = 0;
  materialesPreKinder: number = 0;
  materialesDescargables: number = 0;

  // Datos de planificaciones
  planificacionesRecientes: Planificacion[] = [];
  totalPlanificaciones: number = 0;

  constructor(
    private router: Router,
    private materialService: MaterialService,
    private planificacionService: PlanificacionService
  ) {}

  ngOnInit(): void {
    this.cargarDatos();
  }

  onChangeNivel(nivel: NivelEducativo): void {
    this.currentNivel = nivel;
    this.cargarDatos();
  }

  cargarDatos(): void {
    // Cargar materiales
    this.materialService.getAllMateriales().subscribe(materiales => {
      this.materialesRecientes = materiales.slice(0, 5);
      this.totalMateriales = materiales.length;
      
      // Contar por área
      this.materialesLenguaje = materiales.filter(m => m.area === 'LENGUAJE').length;
      this.materialesMatematicas = materiales.filter(m => m.area === 'MATEMATICAS').length;
      this.materialesPsicologico = materiales.filter(m => m.area === 'APOYO_PSICOLOGICO').length;
      
      // Contar por nivel
      this.materialesMedio = materiales.filter(m => 
        m.nivel === 'MEDIO_MENOR' || m.nivel === 'MEDIO_MAYOR'
      ).length;
      this.materialesPreKinder = materiales.filter(m => 
        m.nivel === 'PRE_KINDER' || m.nivel === 'KINDER'
      ).length;
      
      // Contar descargables
      this.materialesDescargables = materiales.filter(m => m.esDescargable).length;
    });

    // Cargar planificaciones
    this.planificacionService.getAllPlanificaciones().subscribe(planificaciones => {
      this.planificacionesRecientes = planificaciones.slice(0, 5);
      this.totalPlanificaciones = planificaciones.length;
    });
  }

  verMateriales(): void {
    this.router.navigate(['/materiales']);
  }

  verPlanificaciones(): void {
    this.router.navigate(['/planificaciones']);
  }

  verEstadisticas(): void {
    // Implementar vista de estadísticas si es necesario
    console.log('Ver estadísticas');
  }
} 