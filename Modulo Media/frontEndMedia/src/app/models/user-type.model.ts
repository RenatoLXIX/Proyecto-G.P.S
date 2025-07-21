export enum UserType {
    ESTUDIANTE = 'ESTUDIANTE',
    PROFESOR = 'PROFESOR',
    ADMINISTRADOR = 'ADMINISTRADOR'
}

export interface User {
    id: number;
    nombre: string;
    tipo: UserType;
    curso?: string;  // Solo para estudiantes
    rut: string;
    email: string;
} 