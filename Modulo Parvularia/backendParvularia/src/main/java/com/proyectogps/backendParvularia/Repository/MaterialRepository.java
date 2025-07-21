package com.proyectogps.backendParvularia.Repository;

import com.proyectogps.backendParvularia.Model.Material;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface MaterialRepository extends JpaRepository<Material, Integer> {
    
    List<Material> findByTipo(String tipo);
    
    List<Material> findByNivel(String nivel);
    
    List<Material> findByArea(String area);
    
    List<Material> findByNucleo(String nucleo);
    
    List<Material> findByEje(String eje);
    
    List<Material> findByAmbito(String ambito);
    
    List<Material> findByEsOnline(boolean esOnline);
    
    List<Material> findByEsDescargable(boolean esDescargable);
    
    List<Material> findByEsEditable(boolean esEditable);
    
    List<Material> findByIncluyeSolucionario(boolean incluyeSolucionario);
    
    List<Material> findByTituloContainingIgnoreCase(String titulo);
    
    @Query("SELECT m FROM Material m WHERE m.nivel = :nivel AND m.area IN :areas")
    List<Material> findByNivelAndAreaIn(@Param("nivel") String nivel, @Param("areas") List<String> areas);
    
    @Query("SELECT m FROM Material m WHERE " +
           "(:nucleo IS NULL OR m.nucleo = :nucleo) AND " +
           "(:eje IS NULL OR m.eje = :eje) AND " +
           "(:ambito IS NULL OR m.ambito = :ambito)")
    List<Material> findByNucleoEjeAmbito(@Param("nucleo") String nucleo, 
                                        @Param("eje") String eje, 
                                        @Param("ambito") String ambito);
}

