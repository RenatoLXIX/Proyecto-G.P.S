package com.proyectogps.backendMedia.Service;
import com.proyectogps.backendMedia.Model.Material;
import com.proyectogps.backendMedia.Repository.MaterialRepository;
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
    private final List<String> ASIGNATURA_VALIDAS = List.of("Lenguaje", "Matematicas", "Quimica");

    public List<Material> obtenerMaterialPorNivel(String nivel) {
    List<Material> materiales = materialRepository.findByNivelAndAsignaturaIn(nivel, ASIGNATURA_VALIDAS);
    return (materiales != null) ? materiales : new ArrayList<>(); // Si es null, retorna lista vacía
    }

public List<String> obtenerUrlsPorNivel(String nivel) {
    List<Material> materiales = materialRepository.findByNivelAndAsignaturaIn(nivel, ASIGNATURA_VALIDAS);
    return materiales.stream()
                     .map(Material::getUrl_descarga)
                     .collect(Collectors.toList());
}
}