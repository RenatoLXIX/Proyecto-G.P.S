import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { User, UserType } from '../../models/user-type.model';

@Component({
    selector: 'app-student-dashboard',
    templateUrl: './student-dashboard.component.html',
    styleUrls: ['./student-dashboard.component.css']
})
export class StudentDashboardComponent implements OnInit {
    currentUser: User | null = null;
    userTypes = UserType;

    constructor(
        private authService: AuthService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.currentUser = this.authService.getCurrentUser();
        if (!this.currentUser || !this.authService.isStudent()) {
            this.router.navigate(['/login']);
        }
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
} 