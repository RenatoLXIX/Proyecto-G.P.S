package com.proyectogps.backendBasica.Controller;

import com.proyectogps.backendBasica.Model.Recurso;
import com.proyectogps.backendBasica.Service.RecursoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/recursos")
@CrossOrigin(origins = "*")
public class RecursoController {

    private final RecursoService service;

    public RecursoController(RecursoService service) {
        this.service = service;
    }

    // Obtener todos los recursos
    @GetMapping
    public ResponseEntity<List<Recurso>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    // Obtener recurso por ID
    @GetMapping("/{id}")
    public ResponseEntity<Recurso> getById(@PathVariable Integer id) {
        return service.getById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Crear nuevo recurso
    @PostMapping
    public ResponseEntity<Recurso> create(@RequestBody Recurso recurso) {
        try {
            Recurso nuevoRecurso = service.createRecurso(recurso);
            return ResponseEntity.ok(nuevoRecurso);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    // Actualizar recurso existente
    @PutMapping("/{id}")
    public ResponseEntity<Recurso> update(
            @PathVariable Integer id,
            @RequestBody Recurso recursoActualizado) {
        try {
            Recurso recurso = service.actualizar(id, recursoActualizado);
            return ResponseEntity.ok(recurso);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // Filtrar recursos
    @GetMapping("/filtrar")
    public ResponseEntity<List<Recurso>> filtrar(
            @RequestParam(required = false) String tipo,
            @RequestParam(required = false) String nivel,
            @RequestParam(required = false) String asignatura) {
        
        // Validación de parámetros (opcional)
        if ((tipo == null || tipo.isEmpty()) && 
            (nivel == null || nivel.isEmpty()) && 
            (asignatura == null || asignatura.isEmpty())) {
            return ResponseEntity.badRequest().build();
        }

        List<Recurso> resultados = service.filtrar(tipo, nivel, asignatura);
        return ResponseEntity.ok(resultados);
    }

    // Endpoints adicionales para búsquedas específicas
    @GetMapping("/tipo/{tipo}")
    public ResponseEntity<List<Recurso>> findByTipo(@PathVariable String tipo) {
        return ResponseEntity.ok(service.findByTipo(tipo));
    }

    @GetMapping("/nivel/{nivel}")
    public ResponseEntity<List<Recurso>> findByNivel(@PathVariable String nivel) {
        return ResponseEntity.ok(service.findByNivel(nivel));
    }

    @GetMapping("/asignatura/{asignatura}")
    public ResponseEntity<List<Recurso>> findByAsignatura(@PathVariable String asignatura) {
        return ResponseEntity.ok(service.findByAsignatura(asignatura));
    }
}