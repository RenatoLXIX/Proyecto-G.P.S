package com.proyectogps.backendBasica.Repository;

import com.proyectogps.backendBasica.Model.MaterialComplementario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MaterialComplementarioRepository extends JpaRepository<MaterialComplementario, Integer> {
    
    // Puedes agregar métodos personalizados aquí si los necesitas, por ejemplo:
    // List<MaterialComplementario> findByAsignatura(String asignatura);
}

