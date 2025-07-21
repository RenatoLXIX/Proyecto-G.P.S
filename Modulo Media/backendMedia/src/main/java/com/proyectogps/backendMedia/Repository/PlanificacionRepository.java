package com.proyectogps.backendMedia.Repository;

import com.proyectogps.backendMedia.Model.Planificacion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface PlanificacionRepository extends JpaRepository<Planificacion, Integer> {
    List<Planificacion> findByTipo(String tipo);
    List<Planificacion> findByNivel(String nivel);
    List<Planificacion> findByAsignatura(String asignatura);
    List<Planificacion> findByObjetivosContainingIgnoreCase(String objetivos);
}
