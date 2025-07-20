import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { User, UserType } from '../../models/user-type.model';
import { CalificacionService } from '../../services/calificacion.service';
import { MaterialService } from '../../services/material.service';

@Component({
    selector: 'app-student-dashboard',
    templateUrl: './student-dashboard.component.html',
    styleUrls: ['./student-dashboard.component.css']
})
export class StudentDashboardComponent implements OnInit {
    currentUser: User | null = null;
    userTypes = UserType;
    
    // Datos del estudiante
    promedioGeneral: number = 0;
    totalMateriales: number = 0;

    constructor(
        private authService: AuthService,
        private router: Router,
        private calificacionService: CalificacionService,
        private materialService: MaterialService
    ) {}

    ngOnInit(): void {
        this.currentUser = this.authService.getCurrentUser();
        if (!this.currentUser || !this.authService.isStudent()) {
            this.router.navigate(['/login']);
        } else {
            this.cargarDatosEstudiante();
        }
    }

    cargarDatosEstudiante(): void {
        // Simular datos del estudiante (en producción vendrían del backend)
        this.cargarPromedioGeneral();
        this.cargarTotalMateriales();
    }

    cargarPromedioGeneral(): void {
        // Simular promedio (en producción vendría del backend)
        this.promedioGeneral = 6.4;
    }

    cargarTotalMateriales(): void {
        // Simular total de materiales (en producción vendría del backend)
        this.totalMateriales = 24;
    }

    onLogout(): void {
        this.authService.logout();
    }

    handleUserTypeChange(event: Event): void {
        const select = event.target as HTMLSelectElement;
        const newType = select.value as UserType;
        this.onChangeUserType(newType);
    }

    onChangeUserType(newType: UserType): void {
        this.authService.changeUserType(newType);
        this.currentUser = this.authService.getCurrentUser();
    }

    verCalificaciones(): void {
        this.router.navigate(['/calificaciones']);
    }

    verMateriales(): void {
        this.router.navigate(['/materiales']);
    }
} 