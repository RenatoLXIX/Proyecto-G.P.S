package com.proyectogps.backendBasica.Repository;

import com.proyectogps.backendBasica.Model.Planificacion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PlanificacionRepository extends JpaRepository<Planificacion, Integer> {

    // Ejemplo de método personalizado si lo necesitas:
    // List<Planificacion> findByAsignatura(String asignatura);
}
