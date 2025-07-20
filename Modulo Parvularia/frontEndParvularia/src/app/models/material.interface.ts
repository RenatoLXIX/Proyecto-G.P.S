export interface Material {
    idMaterial?: number;
    titulo: string;
    tipo: string;
    nivel: string;
    area: string;
    nucleo?: string;
    eje?: string;
    ambito?: string;
    objetivoAprendizaje?: string;
    descripcion: string;
    url_descarga?: string;
    esOnline: boolean;
    esDescargable: boolean;
    esEditable: boolean;
    incluyeSolucionario: boolean;
    fechaCreacion: Date;
    autor: string;
} 