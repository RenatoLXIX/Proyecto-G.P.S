package com.proyectogps.backendParvularia.Service;


import com.proyectogps.backendParvularia.Model.Material;
import com.proyectogps.backendParvularia.Repository.MaterialRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class MaterialService {

    @Autowired
    private MaterialRepository materialRepository;

    // Áreas permitidas para filtrar (lenguaje, matemáticas, apoyo psicológico)
    private final List<String> AREAS_VALIDAS = List.of("Lenguaje", "Matematicas", "Apoyo psicológico");

 public List<Material> obtenerMaterialPorNivel(String nivel) {
    List<Material> materiales = materialRepository.findByNivelAndAreaIn(nivel, AREAS_VALIDAS);
    
    return (materiales != null) ? materiales : new ArrayList<>(); // Si es null, retorna lista vacía
}

public List<String> obtenerUrlsPorNivel(String nivel) {
    List<Material> materiales = materialRepository.findByNivelAndAreaIn(nivel, AREAS_VALIDAS);
    return materiales.stream()
                     .map(Material::getUrl)
                     .collect(Collectors.toList());
}


    
    public List<Material> obtenerMaterialPorCategoria(String nucleo, String eje, String ambito) {
        return materialRepository.findByNucleoEjeAmbito(nucleo, eje, ambito);
    }
}

