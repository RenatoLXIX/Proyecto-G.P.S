package com.proyectogps.backendBasica.Repository;

import com.proyectogps.backendBasica.Model.Recurso;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RecursoRepository extends JpaRepository<Recurso, Integer> {

    // Ejemplos de métodos personalizados si los necesitas:
    // List<Recurso> findByAsignatura(String asignatura);
    // List<Recurso> findByTipo(String tipo);
}

