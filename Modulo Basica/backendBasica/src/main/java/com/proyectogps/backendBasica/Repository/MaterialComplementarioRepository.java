package com.proyectogps.backendBasica.Repository;

import com.proyectogps.backendBasica.Model.MaterialComplementario;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MaterialComplementarioRepository extends JpaRepository<MaterialComplementario, Integer> {
    List<MaterialComplementario> findByTipoContainingIgnoreCaseAndNivelContainingIgnoreCaseAndAsignaturaContainingIgnoreCase(
        String tipo, String nivel, String asignatura);
    
    List<MaterialComplementario> findByTipo(String tipo);
    
    List<MaterialComplementario> findByNivel(String nivel);
    
    List<MaterialComplementario> findByAsignatura(String asignatura);
}
