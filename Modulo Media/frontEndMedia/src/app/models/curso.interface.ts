export interface Curso {
  idCurso?: number;
  nombre: string;
  nivel: string;
  asignatura: string;
  profesor: string;
  descripcion?: string;
  fechaInicio?: Date;
  fechaFin?: Date;
  activo: boolean;
} 