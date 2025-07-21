package com.proyectogps.backendBasica.Controller;

import com.proyectogps.backendBasica.Model.MaterialComplementario;
import com.proyectogps.backendBasica.Service.MaterialComplementarioService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController

@RequestMapping("/api/materiales")
@CrossOrigin(origins = "*") // Permite llamadas desde el frontend
public class MaterialComplementarioController {

    private final MaterialComplementarioService service;

    public MaterialComplementarioController(MaterialComplementarioService service) {
        this.service = service;
    }

    // Obtener todos los materiales
    @GetMapping
    public ResponseEntity<List<MaterialComplementario>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    // Obtener material por ID
    @GetMapping("/{id}")
    public ResponseEntity<MaterialComplementario> getById(@PathVariable Integer id) {
        return service.getById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Crear nuevo material
    @PostMapping
    public ResponseEntity<MaterialComplementario> create(@RequestBody MaterialComplementario material) {
        try {
            MaterialComplementario nuevoMaterial = service.createMaterial(material);
            return ResponseEntity.ok(nuevoMaterial);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    // Actualizar material existente
    @PutMapping("/{id}")
    public ResponseEntity<MaterialComplementario> update(
            @PathVariable Integer id,
            @RequestBody MaterialComplementario materialActualizado) {
        try {
            MaterialComplementario material = service.actualizar(id, materialActualizado);
            return ResponseEntity.ok(material);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // Filtrar materiales
    @GetMapping("/filtrar")
    public ResponseEntity<List<MaterialComplementario>> filtrar(
            @RequestParam(required = false) String tipo,
            @RequestParam(required = false) String nivel,
            @RequestParam(required = false) String asignatura) {
        
        // Validación de parámetros (opcional)
        if ((tipo == null || tipo.isEmpty()) && 
            (nivel == null || nivel.isEmpty()) && 
            (asignatura == null || asignatura.isEmpty())) {
            return ResponseEntity.badRequest().build();
        }

        List<MaterialComplementario> resultados = service.filtrar(tipo, nivel, asignatura);
        return ResponseEntity.ok(resultados);
    }

    // Endpoints adicionales para búsquedas específicas
    /*@GetMapping("/tipo/{tipo}")
    public ResponseEntity<List<MaterialComplementario>> findByTipo(@PathVariable String tipo) {
        return ResponseEntity.ok(service.findByTipo(tipo));
    }

    @GetMapping("/nivel/{nivel}")
    public ResponseEntity<List<MaterialComplementario>> findByNivel(@PathVariable String nivel) {
        return ResponseEntity.ok(service.findByNivel(nivel));
    }

    @GetMapping("/asignatura/{asignatura}")
    public ResponseEntity<List<MaterialComplementario>> findByAsignatura(@PathVariable String asignatura) {
        return ResponseEntity.ok(service.findByAsignatura(asignatura));
    }
        */
}