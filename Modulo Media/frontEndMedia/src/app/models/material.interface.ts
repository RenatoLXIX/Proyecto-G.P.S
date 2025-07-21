export interface Material {
    idMaterial?: number;
    titulo: string;
    tipo: string;
    nivel: string;
    asignatura: string;
    descripcion: string;
    url_descarga?: string;
    esOnline: boolean;
    fechaCreacion: Date;
    autor: string;
} 