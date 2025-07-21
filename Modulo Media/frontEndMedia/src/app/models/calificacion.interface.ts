export interface Calificacion {
  idCalificacion?: number;
  idEstudiante: number;
  idEvaluacion: number;
  idCurso: number;
  nota: number;
  fechaCalificacion: Date;
  comentario?: string;
  tipoEvaluacion: string;
  asignatura: string;
  nivel: string;
}

export interface CalificacionEstudiante {
  idCalificacion?: number;
  nombreEvaluacion: string;
  tipoEvaluacion: string;
  asignatura: string;
  nota: number;
  notaMaxima: number;
  fechaCalificacion: Date;
  comentario?: string;
  porcentaje: number;
} 