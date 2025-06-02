package com.proyectogps.backendParvularia.Repository;

import com.proyectogps.backendParvularia.Model.Material;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface MaterialRepository extends JpaRepository<Material, Integer> {

     List<Material> findByNivelAndAreaIn(String nivel, List<String> areas);


         @Query("SELECT m FROM Material m JOIN m.categoriaOrganizativa c " +
           "WHERE (:nucleo IS NULL OR c.nucleo = :nucleo) " +
           "AND (:eje IS NULL OR c.eje = :eje) " +
           "AND (:ambito IS NULL OR c.ambito = :ambito)")
    List<Material> findByNucleoEjeAmbito(String nucleo, String eje, String ambito);

    
    // Ejemplo de método personalizado si lo necesitas
    // List<Material> findByTituloContainingIgnoreCase(String titulo);
}

