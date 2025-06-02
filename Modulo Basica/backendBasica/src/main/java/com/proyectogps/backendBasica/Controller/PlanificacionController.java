package com.proyectogps.backendBasica.Controller;

import com.proyectogps.backendBasica.Model.Planificacion;
import com.proyectogps.backendBasica.Service.PlanificacionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/planificaciones")
@CrossOrigin(origins = "*")
public class PlanificacionController {

    @Autowired
    private PlanificacionService service;

    @GetMapping
    public List<Planificacion> getAll() {
        return service.getAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Planificacion> getById(@PathVariable Integer id) {
        return service.getById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Planificacion create(@RequestBody Planificacion planificacion) {
        return service.save(planificacion);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Planificacion> update(@PathVariable Integer id, @RequestBody Planificacion planificacion) {
        if (!service.getById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        planificacion.setIdPlanificacion(id);
        return ResponseEntity.ok(service.update(planificacion));
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
