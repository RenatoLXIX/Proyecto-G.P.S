package com.proyectogps.backendMedia.Repository;

import com.proyectogps.backendMedia.Model.Planificacion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PlanificacionRepository extends JpaRepository<Planificacion, Integer> {

    // Puedes agregar consultas personalizadas si es necesario, por ejemplo:
    // List<Planificacion> findByNivel(String nivel);
    // List<Planificacion> findByAsignatura(String asignatura);
}
