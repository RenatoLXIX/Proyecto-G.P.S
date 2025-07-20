package com.proyectogps.backendMedia.Repository;

import com.proyectogps.backendMedia.Model.Material;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface MaterialRepository extends JpaRepository<Material, Integer> {
    List<Material> findByTipo(String tipo);
    List<Material> findByNivel(String nivel);
    List<Material> findByAsignatura(String asignatura);
    List<Material> findByEsOnline(boolean esOnline);
    List<Material> findByTituloContainingIgnoreCase(String titulo);
}
