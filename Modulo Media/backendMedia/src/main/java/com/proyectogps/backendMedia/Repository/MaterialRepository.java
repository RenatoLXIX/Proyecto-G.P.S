package com.proyectogps.backendMedia.Repository;

import com.proyectogps.backendMedia.Model.Material;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MaterialRepository extends JpaRepository<Material, Integer> {

    // Métodos personalizados opcionales:
    // List<Material> findByTipo(String tipo);
    // List<Material> findByAsignatura(String asignatura);
    // List<Material> findByNivel(String nivel);
}
