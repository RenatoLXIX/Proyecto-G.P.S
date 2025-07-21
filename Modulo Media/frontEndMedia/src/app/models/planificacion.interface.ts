export interface Planificacion {
    idPlanificacion?: number;
    tipo: string;
    nivel: string;
    asignatura: string;
    objetivos: string;
    fechaCreacion: Date;
    materiales: number[];
} 