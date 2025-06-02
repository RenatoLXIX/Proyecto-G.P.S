package com.proyectogps.backendParvularia.Repository;

import com.proyectogps.backendParvularia.Model.Material;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MaterialRepository extends JpaRepository<Material, Integer> {

     List<Material> findByNivelAndAreaIn(String nivel, List<String> areas);
    // Ejemplo de método personalizado si lo necesitas
    // List<Material> findByTituloContainingIgnoreCase(String titulo);
}

