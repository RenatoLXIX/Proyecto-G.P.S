import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserType } from '../../models/user-type.model';
import { RoleService } from '../../services/role.service';
import { CursoService } from '../../services/curso.service';
import { CalificacionService } from '../../services/calificacion.service';
import { EvaluacionService } from '../../services/evaluacion.service';
import { Curso } from '../../models/curso.interface';
import { Evaluacion } from '../../models/evaluacion.interface';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['home.component.css']
})
export class HomeComponent implements OnInit {
    currentUserType: UserType = UserType.ESTUDIANTE;
    userTypeValues = Object.values(UserType);
    userTypesEnum = UserType;
    userTypeLabels = {
        [UserType.ESTUDIANTE]: 'Estudiante',
        [UserType.PROFESOR]: 'Profesor',
        [UserType.ADMINISTRADOR]: 'Administrador'
    };

    // Datos para estudiantes
    misCursos: Curso[] = [];
    promedioGeneral: number = 0;
    evaluacionesRecientes: Evaluacion[] = [];
    
    // Datos para profesores
    totalMateriales: number = 0;
    estudiantesEvaluados: number = 0;
    planificacionesRecientes: any[] = [];
    totalEstudiantes: number = 0;
    asistenciaPromedio: number = 0;

    constructor(
        private roleService: RoleService,
        private router: Router,
        private cursoService: CursoService,
        private calificacionService: CalificacionService,
        private evaluacionService: EvaluacionService
    ) {}

    ngOnInit(): void {
        this.roleService.selectedRole$.subscribe(role => {
            this.currentUserType = role;
            if (role === UserType.ESTUDIANTE) {
                this.cargarDatosEstudiante();
            } else if (role === UserType.PROFESOR) {
                this.cargarDatosProfesor();
            }
        });
    }

    onChangeUserType(newType: UserType): void {
        this.roleService.changeRole(newType);
    }

    cargarDatosEstudiante(): void {
        // Simular datos de estudiante (en producción vendrían del backend)
        this.cargarMisCursos();
        this.cargarPromedioGeneral();
        this.cargarEvaluacionesRecientes();
    }

    cargarMisCursos(): void {
        // Simular cursos del estudiante
        this.misCursos = [
            {
                idCurso: 1,
                nombre: 'Matemáticas 1° Medio',
                nivel: 'PRIMERO_MEDIO',
                asignatura: 'MATEMATICAS',
                profesor: 'Prof. García',
                descripcion: 'Curso de matemáticas para primer año medio',
                activo: true
            },
            {
                idCurso: 2,
                nombre: 'Lenguaje 1° Medio',
                nivel: 'PRIMERO_MEDIO',
                asignatura: 'LENGUAJE',
                profesor: 'Prof. Rodríguez',
                descripcion: 'Curso de lenguaje para primer año medio',
                activo: true
            },
            {
                idCurso: 3,
                nombre: 'Física 1° Medio',
                nivel: 'PRIMERO_MEDIO',
                asignatura: 'FISICA',
                profesor: 'Prof. López',
                descripcion: 'Curso de física para primer año medio',
                activo: true
            }
        ];
    }

    cargarPromedioGeneral(): void {
        // Simular promedio (en producción vendría del backend)
        this.promedioGeneral = 6.2;
    }

    cargarEvaluacionesRecientes(): void {
        // Simular evaluaciones recientes
        this.evaluacionesRecientes = [
            {
                idEvaluacion: 1,
                tipo: 'PRUEBA',
                descripcion: 'Prueba de álgebra',
                nivel: 'PRIMERO_MEDIO',
                asignatura: 'MATEMATICAS',
                tiempoMinutos: 90,
                tieneSolucionario: true,
                tipoRecurso: 'LOCAL',
                urlRecurso: '',
                fechaCreacion: new Date()
            },
            {
                idEvaluacion: 2,
                tipo: 'CONTROL',
                descripcion: 'Control de lectura',
                nivel: 'PRIMERO_MEDIO',
                asignatura: 'LENGUAJE',
                tiempoMinutos: 45,
                tieneSolucionario: false,
                tipoRecurso: 'URL',
                urlRecurso: '',
                fechaCreacion: new Date()
            }
        ];
    }

    verMisCursos(): void {
        this.router.navigate(['/cursos']);
    }

    verCalificaciones(): void {
        this.router.navigate(['/calificaciones']);
    }

    verEvaluaciones(): void {
        this.router.navigate(['/evaluaciones']);
    }

    cargarDatosProfesor(): void {
        // Simular datos del profesor (en producción vendrían del backend)
        this.cargarMisCursos();
        this.cargarEvaluacionesRecientes();
        this.cargarEstadisticasProfesor();
        this.cargarPlanificacionesRecientes();
    }

    cargarEstadisticasProfesor(): void {
        // Simular estadísticas del profesor
        this.totalMateriales = 15;
        this.estudiantesEvaluados = 45;
        this.totalEstudiantes = 60;
        this.asistenciaPromedio = 85;
        this.promedioGeneral = 6.1;
    }

    cargarPlanificacionesRecientes(): void {
        // Simular planificaciones recientes del profesor
        this.planificacionesRecientes = [
            {
                idPlanificacion: 1,
                tipo: 'ANUAL',
                asignatura: 'MATEMATICAS',
                nivel: 'PRIMERO_MEDIO',
                objetivos: 'Planificación anual de matemáticas'
            },
            {
                idPlanificacion: 2,
                tipo: 'SEMESTRAL',
                asignatura: 'FISICA',
                nivel: 'SEGUNDO_MEDIO',
                objetivos: 'Planificación semestral de física'
            },
            {
                idPlanificacion: 3,
                tipo: 'UNIDAD',
                asignatura: 'LENGUAJE',
                nivel: 'PRIMERO_MEDIO',
                objetivos: 'Planificación de unidad de lenguaje'
            }
        ];
    }

    verMateriales(): void {
        this.router.navigate(['/materiales']);
    }

    verPlanificaciones(): void {
        this.router.navigate(['/planificaciones']);
    }

    verEstadisticas(): void {
        // Navegar a una página de estadísticas (puede ser una nueva ruta)
        this.router.navigate(['/estadisticas']);
    }
} 