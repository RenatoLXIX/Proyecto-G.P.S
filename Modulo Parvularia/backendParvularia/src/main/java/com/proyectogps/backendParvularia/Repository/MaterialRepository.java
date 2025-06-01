package com.proyectogps.backendParvularia.Repository;

import com.proyectogps.backendParvularia.Model.Material;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MaterialRepository extends JpaRepository<Material, Integer> {

    // Ejemplo de método personalizado si lo necesitas
    // List<Material> findByTituloContainingIgnoreCase(String titulo);
}

