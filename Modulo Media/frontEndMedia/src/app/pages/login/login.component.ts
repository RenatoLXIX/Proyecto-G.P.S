import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {
    rut: string = '';
    password: string = '';
    error: string = '';

    constructor(
        private authService: AuthService,
        private router: Router
    ) {}

    onSubmit(): void {
        if (!this.rut || !this.password) {
            this.error = 'Por favor, complete todos los campos';
            return;
        }

        this.authService.login(this.rut, this.password).subscribe({
            next: () => {
                this.router.navigate(['/home']);
            },
            error: (err) => {
                this.error = 'Error al iniciar sesión: ' + err.message;
            }
        });
    }
} 