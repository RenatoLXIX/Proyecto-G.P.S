package com.proyectogps.backendParvularia.Repository;

import com.proyectogps.backendParvularia.Model.Planificacion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface PlanificacionRepository extends JpaRepository<Planificacion, Integer> {
    
    List<Planificacion> findByTipo(String tipo);
    
    List<Planificacion> findByNivel(String nivel);
    
    List<Planificacion> findByArea(String area);
    
    List<Planificacion> findByAmbito(String ambito);
    
    List<Planificacion> findByNucleo(String nucleo);
    
    List<Planificacion> findByEje(String eje);
    
    List<Planificacion> findByEsDescargable(boolean esDescargable);
    
    List<Planificacion> findByEsEditable(boolean esEditable);
}
