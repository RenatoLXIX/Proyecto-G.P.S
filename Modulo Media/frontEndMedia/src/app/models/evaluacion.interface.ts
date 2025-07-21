export interface Evaluacion {
    idEvaluacion?: number;
    tipo: string;
    nivel: string;
    asignatura: string;
    descripcion: string;
    tiempoMinutos: number;
    tieneSolucionario: boolean;
    tipoRecurso: 'LOCAL' | 'URL';
    urlRecurso?: string;
    archivo?: File;
    nombreArchivo?: string;
    idMaterial?: number;
    fechaCreacion: Date;
} 