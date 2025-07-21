package com.proyectogps.backendBasica.Repository;

import com.proyectogps.backendBasica.Model.Recurso;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RecursoRepository extends JpaRepository<Recurso, Integer> {

    // Método para búsqueda filtrada con coincidencias parciales e insensibilidad a mayúsculas
    List<Recurso> findByTipoContainingIgnoreCaseAndNivelContainingIgnoreCaseAndAsignaturaContainingIgnoreCase(
        String tipo, String nivel, String asignatura);
    
    // Métodos para búsqueda exacta por cada campo
    List<Recurso> findByTipo(String tipo);
    
    List<Recurso> findByNivel(String nivel);
    
    List<Recurso> findByAsignatura(String asignatura);
    
    
    
   
}