export interface Planificacion {
    idPlanificacion?: number;
    tipo: string;
    nivel: string;
    area: string;
    ambito?: string;
    nucleo?: string;
    eje?: string;
    objetivos: string;
    actividadesVariables?: string;
    recreosDirigidos?: string;
    fechaCreacion: Date;
    fechaClase?: Date;
    esDescargable: boolean;
    esEditable: boolean;
} 