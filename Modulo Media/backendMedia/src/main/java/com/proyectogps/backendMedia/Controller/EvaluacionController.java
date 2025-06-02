package com.proyectogps.backendMedia.Controller;

import com.proyectogps.backendMedia.Model.Evaluacion;
import com.proyectogps.backendMedia.Service.EvaluacionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/evaluaciones")
@CrossOrigin(origins = "*")
public class EvaluacionController {

    @Autowired
    private EvaluacionService service;

    @GetMapping
    public List<Evaluacion> getAllEvaluaciones() {
        return service.getAllEvaluaciones();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Evaluacion> getEvaluacionById(@PathVariable Integer id) {
        return service.getEvaluacionById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/tipo/{tipo}")
    public List<Evaluacion> getEvaluacionesByTipo(@PathVariable String tipo) {
        return service.getEvaluacionesByTipo(tipo);
    }

    @GetMapping("/nivel/{nivel}")
    public List<Evaluacion> getEvaluacionesByNivel(@PathVariable String nivel) {
        return service.getEvaluacionesByNivel(nivel);
    }

    @GetMapping("/asignatura/{asignatura}")
    public List<Evaluacion> getEvaluacionesByAsignatura(@PathVariable String asignatura) {
        return service.getEvaluacionesByAsignatura(asignatura);
    }

    @GetMapping("/solucionario/{tieneSolucionario}")
    public List<Evaluacion> getEvaluacionesByTieneSolucionario(@PathVariable boolean tieneSolucionario) {
        return service.getEvaluacionesByTieneSolucionario(tieneSolucionario);
    }

    @GetMapping("/tiempo-menor")
    public List<Evaluacion> getEvaluacionesByTiempoMenorA(@RequestParam int tiempoMinutos) {
        return service.getEvaluacionesByTiempoMenorA(tiempoMinutos);
    }

    @GetMapping("/material/{idMaterial}")
    public List<Evaluacion> getEvaluacionesByMaterialId(@PathVariable Integer idMaterial) {
        return service.getEvaluacionesByMaterialId(idMaterial);
    }

    @PostMapping
    public Evaluacion createEvaluacion(@RequestBody Evaluacion evaluacion) {
        return service.saveEvaluacion(evaluacion);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Evaluacion> updateEvaluacion(
            @PathVariable Integer id,
            @RequestBody Evaluacion evaluacion) {
        Evaluacion updatedEvaluacion = service.updateEvaluacion(id, evaluacion);
        return updatedEvaluacion != null ?
                ResponseEntity.ok(updatedEvaluacion) :
                ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEvaluacion(@PathVariable Integer id) {
        service.deleteEvaluacion(id);
        return ResponseEntity.ok().build();
    }
} 