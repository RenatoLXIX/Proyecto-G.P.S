package com.proyectogps.backendMedia.Controller;

import com.proyectogps.backendMedia.Model.Material;
import com.proyectogps.backendMedia.Service.MaterialService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.util.List;

@RestController
@RequestMapping("/api/materiales")
@CrossOrigin(origins = "*")
public class MaterialController {

    @Autowired
    private MaterialService service;

    @GetMapping
    public List<Material> getAllMateriales() {
        return service.getAllMateriales();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Material> getMaterialById(@PathVariable int id) {
        return service.getMaterialById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/tipo/{tipo}")
    public List<Material> getMaterialesByTipo(@PathVariable String tipo) {
        return service.getMaterialesByTipo(tipo);
    }

    @GetMapping("/nivel/{nivel}")
    public List<Material> getMaterialesByNivel(@PathVariable String nivel) {
        return service.getMaterialesByNivel(nivel);
    }

    @GetMapping("/asignatura/{asignatura}")
    public List<Material> getMaterialesByAsignatura(@PathVariable String asignatura) {
        return service.getMaterialesByAsignatura(asignatura);
    }

    @GetMapping("/online/{esOnline}")
    public List<Material> getMaterialesByEsOnline(@PathVariable boolean esOnline) {
        return service.getMaterialesByEsOnline(esOnline);
    }

    @GetMapping("/buscar")
    public List<Material> searchMaterialesByTitulo(@RequestParam String titulo) {
        return service.searchMaterialesByTitulo(titulo);
    }

    @PostMapping
    public Material createMaterial(
            @RequestPart("material") Material material,
            @RequestPart(value = "file", required = false) MultipartFile file) {
        return service.saveMaterial(material, file);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Material> updateMaterial(
            @PathVariable int id,
            @RequestPart("material") Material material,
            @RequestPart(value = "file", required = false) MultipartFile file) {
        Material updatedMaterial = service.updateMaterial(id, material, file);
        return updatedMaterial != null ?
                ResponseEntity.ok(updatedMaterial) :
                ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMaterial(@PathVariable int id) {
        service.deleteMaterial(id);
        return ResponseEntity.ok().build();
    }
} 