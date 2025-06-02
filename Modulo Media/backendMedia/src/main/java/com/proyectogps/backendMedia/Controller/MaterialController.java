package com.proyectogps.backendMedia.Controller;

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

import com.proyectogps.backendMedia.Model.Material;
import com.proyectogps.backendMedia.Repository.MaterialRepository;
import com.proyectogps.backendMedia.Service.MaterialService;

@RestController
@RequestMapping("/api/materiales")
public class MaterialController {

    @Autowired
    private MaterialRepository materialRepository;

    @Autowired
    private final MaterialService materialService;

    public MaterialController(MaterialService materialService) {
        this.materialService = materialService;
    }

    // Áreas comunes para todos los niveles
    private final List<String> ASIGNATURA_VALIDAS = List.of("Lenguaje", "Matematicas", "Quimica");


    @GetMapping("/1")
    public ResponseEntity<List<String>> getUrlsMaterialPrimeroMedio() {
    List<Material> materiales = materialService.obtenerMaterialPorNivel("Primero Medio");

    List<String> urlsConTitulo = materiales.stream()
            .map(m -> "Título: " + m.getTitulo() + " - URL: " + m.getUrl_descarga()+ " - Asignatura: " + m.getAsignatura())
            .collect(Collectors.toList());

    return ResponseEntity.ok(urlsConTitulo);
    }

    @GetMapping("/2")
    public ResponseEntity<List<String>> getUrlsMaterialMedioMayor() {
    List<Material> materiales = materialService.obtenerMaterialPorNivel("Segundo Medio");

    List<String> urlsConTitulo = materiales.stream()
            .map(m -> "Título: " + m.getTitulo() + " - URL: " + m.getUrl_descarga())
            .collect(Collectors.toList());

    return ResponseEntity.ok(urlsConTitulo);
    }


    @GetMapping("/3")
    public ResponseEntity<List<String>> getUrlsMaterialPreKinder() {
    List<Material> materiales = materialService.obtenerMaterialPorNivel("Tercero Medio");

    List<String> urlsConTitulo = materiales.stream()
            .map(m -> "Título: " + m.getTitulo() + " - URL: " + m.getUrl_descarga())
            .collect(Collectors.toList());

    return ResponseEntity.ok(urlsConTitulo);
    }

    @GetMapping("/4")
    public ResponseEntity<List<String>> getUrlsMaterialKinder() {
    List<Material> materiales = materialService.obtenerMaterialPorNivel("Cuarto Medio");

    List<String> urlsConTitulo = materiales.stream()
            .map(m -> "Título: " + m.getTitulo() + " - URL: " + m.getUrl_descarga())
            .collect(Collectors.toList());

    return ResponseEntity.ok(urlsConTitulo);
    }
}