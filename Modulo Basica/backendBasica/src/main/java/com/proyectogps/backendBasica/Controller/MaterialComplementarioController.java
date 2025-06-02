package com.proyectogps.backendBasica.Controller;

import com.proyectogps.backendBasica.Model.MaterialComplementario;
import com.proyectogps.backendBasica.Service.MaterialComplementarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/materiales")
@CrossOrigin(origins = "*")
public class MaterialComplementarioController {

    @Autowired
    private MaterialComplementarioService service;

    @GetMapping
    public List<MaterialComplementario> getAll() {
        return service.getAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<MaterialComplementario> getById(@PathVariable Integer id) {
        return service.getById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public MaterialComplementario create(@RequestBody MaterialComplementario material) {
        return service.save(material);
    }

    @PutMapping("/{id}")
    public ResponseEntity<MaterialComplementario> update(@PathVariable Integer id, @RequestBody MaterialComplementario material) {
        if (!service.getById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        material.setIdMaterial(id);
        return ResponseEntity.ok(service.update(material));
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
