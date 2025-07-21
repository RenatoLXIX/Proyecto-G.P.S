package com.proyectogps.backendMedia.Controller;

import com.proyectogps.backendMedia.Model.Planificacion;
import com.proyectogps.backendMedia.Service.PlanificacionService;
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
    public List<Planificacion> getAllPlanificaciones() {
        return service.getAllPlanificaciones();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Planificacion> getPlanificacionById(@PathVariable int id) {
        return service.getPlanificacionById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/tipo/{tipo}")
    public List<Planificacion> getPlanificacionesByTipo(@PathVariable String tipo) {
        return service.getPlanificacionesByTipo(tipo);
    }

    @GetMapping("/nivel/{nivel}")
    public List<Planificacion> getPlanificacionesByNivel(@PathVariable String nivel) {
        return service.getPlanificacionesByNivel(nivel);
    }

    @GetMapping("/asignatura/{asignatura}")
    public List<Planificacion> getPlanificacionesByAsignatura(@PathVariable String asignatura) {
        return service.getPlanificacionesByAsignatura(asignatura);
    }

    @GetMapping("/buscar")
    public List<Planificacion> searchPlanificacionesByObjetivos(@RequestParam String objetivos) {
        return service.searchPlanificacionesByObjetivos(objetivos);
    }

    @PostMapping
    public Planificacion createPlanificacion(@RequestBody Planificacion planificacion) {
        return service.savePlanificacion(planificacion);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Planificacion> updatePlanificacion(
            @PathVariable int id,
            @RequestBody Planificacion planificacion) {
        Planificacion updatedPlanificacion = service.updatePlanificacion(id, planificacion);
        return updatedPlanificacion != null ?
                ResponseEntity.ok(updatedPlanificacion) :
                ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePlanificacion(@PathVariable int id) {
        service.deletePlanificacion(id);
        return ResponseEntity.ok().build();
    }
} 