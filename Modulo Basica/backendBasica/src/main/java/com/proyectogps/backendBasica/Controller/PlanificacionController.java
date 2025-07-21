package com.proyectogps.backendBasica.Controller;

import com.proyectogps.backendBasica.Model.Planificacion;
import com.proyectogps.backendBasica.Service.PlanificacionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/planificaciones")
@CrossOrigin(origins = "*") // Permite peticiones desde frontend
public class PlanificacionController {

    @Autowired
    private PlanificacionService service;

    // 🔹 Listar todas las planificaciones



 


    public PlanificacionController(PlanificacionService service) {
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<List<Planificacion>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Planificacion> getById(@PathVariable Integer id) {
        return service.getById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Planificacion> create(@RequestBody Planificacion planificacion) {
        try {
            Planificacion nuevaPlanificacion = service.createPlanificacion(planificacion);
            return ResponseEntity.ok(nuevaPlanificacion);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/filtrar")
    public ResponseEntity<List<Planificacion>> filtrar(
            @RequestParam(required = false) String nivel,
            @RequestParam(required = false) String clasificacionDUA,
            @RequestParam(required = false) String articulo,
            @RequestParam(required = false) String asignatura) {
        
        List<Planificacion> resultados = service.filtrar(nivel, clasificacionDUA, articulo, asignatura);
        return ResponseEntity.ok(resultados);
    }
}

