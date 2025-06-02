
package com.proyectogps.backendParvularia.Controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.proyectogps.backendParvularia.Model.Material;
import com.proyectogps.backendParvularia.Repository.MaterialRepository;
import com.proyectogps.backendParvularia.Service.MaterialService;

@RestController
@RequestMapping("/api/materiales")
public class MaterialController {

    @Autowired
    private MaterialRepository materialRepository;

    @Autowired
    private MaterialService materialService;
    // Áreas comunes para todos los niveles
    private final List<String> AREAS = List.of("Lenguaje", "Matemáticas", "Apoyo psicológico");

    @GetMapping("/medio-menor")
    public ResponseEntity<List<String>> getUrlsMaterialMedioMenor() {
    List<Material> materiales = materialService.obtenerMaterialPorNivel("Medio Menor");

    List<String> urlsConTitulo = materiales.stream()
            .map(m -> "Título: " + m.getTitulo() + " - URL: " + m.getUrl())
            .collect(Collectors.toList());

    return ResponseEntity.ok(urlsConTitulo);
    }

    @GetMapping("/medio-mayor")
    public ResponseEntity<List<String>> getUrlsMaterialMedioMayor() {
    List<Material> materiales = materialService.obtenerMaterialPorNivel("Medio Mayor");

    List<String> urlsConTitulo = materiales.stream()
            .map(m -> "Título: " + m.getTitulo() + " - URL: " + m.getUrl())
            .collect(Collectors.toList());

    return ResponseEntity.ok(urlsConTitulo);
    }


    @GetMapping("/pre-kinder")
    public ResponseEntity<List<String>> getUrlsMaterialPreKinder() {
    List<Material> materiales = materialService.obtenerMaterialPorNivel("Pre-Kinder");

    List<String> urlsConTitulo = materiales.stream()
            .map(m -> "Título: " + m.getTitulo() + " - URL: " + m.getUrl())
            .collect(Collectors.toList());

    return ResponseEntity.ok(urlsConTitulo);
    }

    @GetMapping("/kinder")
    public ResponseEntity<List<String>> getUrlsMaterialKinder() {
    List<Material> materiales = materialService.obtenerMaterialPorNivel("Kinder");

    List<String> urlsConTitulo = materiales.stream()
            .map(m -> "Título: " + m.getTitulo() + " - URL: " + m.getUrl())
            .collect(Collectors.toList());

    return ResponseEntity.ok(urlsConTitulo);
    }

   
    // Método interno para evitar repetición
    private ResponseEntity<List<Material>> obtenerMaterialPorNivel(String nivel) {
        List<Material> materiales = materialRepository.findByNivelAndAreaIn(nivel, AREAS);
        return materiales.isEmpty()
            ? ResponseEntity.noContent().build()
            : ResponseEntity.ok(materiales);
    }


    // Endpoint: /api/materiales/filtrar?nucleo=Lenguaje&eje=Comunicación&ambito=Oral
    @GetMapping("/filtrar")
    public ResponseEntity<List<Material>> filtrarMateriales(
            @RequestParam(required = false) String nucleo,
            @RequestParam(required = false) String eje,
            @RequestParam(required = false) String ambito) {

        List<Material> materiales = materialService.obtenerMaterialPorCategoria(nucleo, eje, ambito);

        return materiales.isEmpty()
                ? ResponseEntity.noContent().build()
                : ResponseEntity.ok(materiales);
    }
}
