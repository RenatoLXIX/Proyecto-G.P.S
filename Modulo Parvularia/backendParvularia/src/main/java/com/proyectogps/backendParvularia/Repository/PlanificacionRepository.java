package com.proyectogps.backendParvularia.Repository;

import com.proyectogps.backendParvularia.Model.Planificacion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PlanificacionRepository extends JpaRepository<Planificacion, Integer> {

    // Ejemplo de método personalizado si se desea:
    // List<Planificacion> findByTipo(String tipo);
}
