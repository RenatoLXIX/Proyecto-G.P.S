package com.proyectogps.backendMedia.Repository;

import com.proyectogps.backendMedia.Model.Evaluacion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EvaluacionRepository extends JpaRepository<Evaluacion, Integer> {

    // Ejemplos de métodos personalizados si necesitas en el futuro:
    // List<Evaluacion> findByAsignatura(String asignatura);
    // List<Evaluacion> findByNivel(String nivel);
}
