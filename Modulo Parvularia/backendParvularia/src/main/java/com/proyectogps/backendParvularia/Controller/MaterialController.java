
package com.proyectogps.backendParvularia.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.proyectogps.backendParvularia.Model.Material;
import com.proyectogps.backendParvularia.Repository.MaterialRepository;

@RestController
@RequestMapping("/api/materiales")
public class MaterialController {

    @Autowired
    private MaterialRepository materialRepository;

    // Áreas comunes para todos los niveles
    private final List<String> AREAS = List.of("Lenguaje", "Matemáticas", "Apoyo psicológico");

    @GetMapping("/medio-menor")
    public ResponseEntity<List<Material>> getMaterialMedioMenor() {
        return obtenerMaterialPorNivel("Medio Menor");
    }

    @GetMapping("/medio-mayor")
    public ResponseEntity<List<Material>> getMaterialMedioMayor() {
        return obtenerMaterialPorNivel("Medio Mayor");
    }

    @GetMapping("/pre-kinder")
    public ResponseEntity<List<Material>> getMaterialPreKinder() {
        return obtenerMaterialPorNivel("Pre-Kínder");
    }

    @GetMapping("/kinder")
    public ResponseEntity<List<Material>> getMaterialKinder() {
        return obtenerMaterialPorNivel("Kínder");
    }

    // Método interno para evitar repetición
    private ResponseEntity<List<Material>> obtenerMaterialPorNivel(String nivel) {
        List<Material> materiales = materialRepository.findByNivelAndAreaIn(nivel, AREAS);
        return materiales.isEmpty()
            ? ResponseEntity.noContent().build()
            : ResponseEntity.ok(materiales);
    }
}
