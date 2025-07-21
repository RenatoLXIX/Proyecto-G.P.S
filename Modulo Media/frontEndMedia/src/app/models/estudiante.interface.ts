export interface Estudiante {
  idEstudiante?: number;
  nombre: string;
  apellido: string;
  email: string;
  nivel: string;
  curso: string;
  rut: string;
  fechaNacimiento?: Date;
  activo: boolean;
  cursosInscritos?: number[];
}

export interface EstudianteDetalle {
  idEstudiante?: number;
  nombre: string;
  apellido: string;
  email: string;
  nivel: string;
  curso: string;
  rut: string;
  fechaNacimiento?: Date;
  activo: boolean;
  promedioGeneral?: number;
  totalEvaluaciones?: number;
  asignaturasInscritas?: string[];
} 