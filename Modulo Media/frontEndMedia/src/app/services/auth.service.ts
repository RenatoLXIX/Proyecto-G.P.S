import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User, UserType } from '../models/user-type.model';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private currentUserSubject = new BehaviorSubject<User | null>(null);
    public currentUser$ = this.currentUserSubject.asObservable();

    constructor() {
        // Aquí se podría cargar el usuario desde localStorage si se implementa persistencia
    }

    login(rut: string, password: string): Observable<User> {
        // Aquí iría la lógica real de autenticación con el backend
        // Por ahora simulamos un usuario estudiante
        const mockUser: User = {
            id: 1,
            nombre: 'Estudiante Ejemplo',
            tipo: UserType.ESTUDIANTE,
            curso: '2° Medio A',
            rut: rut,
            email: 'estudiante@ejemplo.cl'
        };
        
        this.currentUserSubject.next(mockUser);
        return this.currentUser$.pipe(
            map(user => {
                if (!user) throw new Error('Usuario no encontrado');
                return user;
            })
        );
    }

    logout(): void {
        this.currentUserSubject.next(null);
    }

    isStudent(): boolean {
        return this.currentUserSubject.value?.tipo === UserType.ESTUDIANTE;
    }

    getCurrentUser(): User | null {
        return this.currentUserSubject.value;
    }

    changeUserType(newType: UserType): void {
        const currentUser = this.currentUserSubject.value;
        if (currentUser) {
            const updatedUser = {
                ...currentUser,
                tipo: newType,
                curso: newType === UserType.ESTUDIANTE ? '2° Medio A' : undefined
            };
            this.currentUserSubject.next(updatedUser);
        }
    }
} 