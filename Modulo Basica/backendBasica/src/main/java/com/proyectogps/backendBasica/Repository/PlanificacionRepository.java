package com.proyectogps.backendBasica.Repository;

import com.proyectogps.backendBasica.Model.Planificacion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PlanificacionRepository extends JpaRepository<Planificacion, Integer> {
    
    List<Planificacion> findByNivelContainingIgnoreCaseAndClasificacionDUAContainingIgnoreCaseAndArticuloContainingIgnoreCaseAndAsignaturaContainingIgnoreCase(
        String nivel, String clasificacionDUA, String articulo, String asignatura);
    
    List<Planificacion> findByNivel(String nivel);
    
    List<Planificacion> findByAsignatura(String asignatura);
    
    List<Planificacion> findByRecursoIdRecurso(Integer idRecurso);
    
    List<Planificacion> findByMaterialComplementarioIdMaterial(Integer idMaterial);
}