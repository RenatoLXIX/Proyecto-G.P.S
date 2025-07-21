
package com.proyectogps.backendParvularia.Controller;

import com.proyectogps.backendParvularia.Model.Material;
import com.proyectogps.backendParvularia.Service.MaterialService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.util.List;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import java.nio.file.Path;
import java.net.MalformedURLException;

@RestController
@RequestMapping("/api/materiales")
@CrossOrigin(origins = "*")
public class MaterialController {

    @Autowired
    private MaterialService service;

    @Autowired
    private com.proyectogps.backendParvularia.Service.FileStorageService fileStorageService;

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

    @GetMapping("/area/{area}")
    public List<Material> getMaterialesByArea(@PathVariable String area) {
        return service.getMaterialesByArea(area);
    }

    @GetMapping("/nucleo/{nucleo}")
    public List<Material> getMaterialesByNucleo(@PathVariable String nucleo) {
        return service.getMaterialesByNucleo(nucleo);
    }

    @GetMapping("/ambito/{ambito}")
    public List<Material> getMaterialesByAmbito(@PathVariable String ambito) {
        return service.getMaterialesByAmbito(ambito);
    }

    @GetMapping("/descargable/{esDescargable}")
    public List<Material> getMaterialesByEsDescargable(@PathVariable boolean esDescargable) {
        return service.getMaterialesByEsDescargable(esDescargable);
    }

    @GetMapping("/editable/{esEditable}")
    public List<Material> getMaterialesByEsEditable(@PathVariable boolean esEditable) {
        return service.getMaterialesByEsEditable(esEditable);
    }

    @GetMapping("/solucionario/{incluyeSolucionario}")
    public List<Material> getMaterialesByIncluyeSolucionario(@PathVariable boolean incluyeSolucionario) {
        return service.getMaterialesByIncluyeSolucionario(incluyeSolucionario);
    }

    @GetMapping("/online/{esOnline}")
    public List<Material> getMaterialesByEsOnline(@PathVariable boolean esOnline) {
        return service.getMaterialesByEsOnline(esOnline);
    }

    @GetMapping("/buscar")
    public List<Material> searchMaterialesByTitulo(@RequestParam String titulo) {
        return service.searchMaterialesByTitulo(titulo);
    }

    @GetMapping("/descargar/{fileName:.+}")
    public ResponseEntity<Resource> downloadFile(@PathVariable String fileName) {
        try {
            Path filePath = fileStorageService.getFilePath(fileName);
            Resource resource = new UrlResource(filePath.toUri());

            if (resource.exists()) {
                return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
                    .body(resource);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (MalformedURLException e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public Material createMaterial(
            @RequestPart("material") Material material,
            @RequestPart(value = "file", required = false) MultipartFile file,
            HttpServletRequest request) {
        System.out.println("[DEBUG] Content-Type recibido: " + request.getContentType());
        System.out.println("[DEBUG] createMaterial llamado");
        System.out.println("[DEBUG] Material recibido: " + material);
        if (file != null) {
            System.out.println("[DEBUG] Archivo recibido: " + file.getOriginalFilename() + ", tamaño: " + file.getSize());
        } else {
            System.out.println("[DEBUG] No se recibió archivo");
        }
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
