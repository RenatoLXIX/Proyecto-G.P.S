package com.proyectogps.backendParvularia.Controller;

import com.proyectogps.backendParvularia.Model.Planificacion;
import com.proyectogps.backendParvularia.Service.PlanificacionService;
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

    @GetMapping("/area/{area}")
    public List<Planificacion> getPlanificacionesByArea(@PathVariable String area) {
        return service.getPlanificacionesByArea(area);
    }

    @GetMapping("/ambito/{ambito}")
    public List<Planificacion> getPlanificacionesByAmbito(@PathVariable String ambito) {
        return service.getPlanificacionesByAmbito(ambito);
    }

    @GetMapping("/nucleo/{nucleo}")
    public List<Planificacion> getPlanificacionesByNucleo(@PathVariable String nucleo) {
        return service.getPlanificacionesByNucleo(nucleo);
    }

    @GetMapping("/descargable/{esDescargable}")
    public List<Planificacion> getPlanificacionesByEsDescargable(@PathVariable boolean esDescargable) {
        return service.getPlanificacionesByEsDescargable(esDescargable);
    }

    @GetMapping("/editable/{esEditable}")
    public List<Planificacion> getPlanificacionesByEsEditable(@PathVariable boolean esEditable) {
        return service.getPlanificacionesByEsEditable(esEditable);
    }

    @PostMapping
    public Planificacion createPlanificacion(@RequestBody Planificacion planificacion) {
        return service.savePlanificacion(planificacion);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Planificacion> updatePlanificacion(
            @PathVariable int id,
            @RequestBody Planificacion planificacionDetails) {
        Planificacion updatedPlanificacion = service.updatePlanificacion(id, planificacionDetails);
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