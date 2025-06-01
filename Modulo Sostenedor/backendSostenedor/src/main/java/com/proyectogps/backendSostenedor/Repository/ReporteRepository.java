package com.proyectogps.backendSostenedor.Repository;

import com.proyectogps.backendSostenedor.Model.Reporte;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReporteRepository extends JpaRepository<Reporte, Integer> {
    // Puedes agregar métodos personalizados si quieres buscar reportes por tipo, fecha, etc.
    
    // Ejemplo: List<Reporte> findByTipo(String tipo);
    // Ejemplo: List<Reporte> findByIdEstablecimiento(Integer idEstablecimiento);
}
