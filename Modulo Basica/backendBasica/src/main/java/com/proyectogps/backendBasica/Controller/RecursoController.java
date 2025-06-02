package com.proyectogps.backendBasica.Controller;

import com.proyectogps.backendBasica.Model.Recurso;
import com.proyectogps.backendBasica.Service.RecursoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/recursos")
@CrossOrigin(origins = "*")
public class RecursoController {

    @Autowired
    private RecursoService service;

    @GetMapping
    public List<Recurso> getAll() {
        return service.getAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Recurso> getById(@PathVariable Integer id) {
        return service.getById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Recurso create(@RequestBody Recurso recurso) {
        return service.save(recurso);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Recurso> update(@PathVariable Integer id, @RequestBody Recurso recurso) {
        if (!service.getById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        recurso.setIdRecurso(id);
        return ResponseEntity.ok(service.update(recurso));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Integer id) {
        if (!service.getById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
