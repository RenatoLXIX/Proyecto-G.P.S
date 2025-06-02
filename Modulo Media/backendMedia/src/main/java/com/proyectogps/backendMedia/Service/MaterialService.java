package com.proyectogps.backendMedia.Service;

import com.proyectogps.backendMedia.Model.Material;
import com.proyectogps.backendMedia.Repository.MaterialRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class MaterialService {

    @Autowired
    private MaterialRepository repository;

    @Autowired
    private FileStorageService fileStorageService;

    public List<Material> getAllMateriales() {
        return repository.findAll();
    }

    public Optional<Material> getMaterialById(int id) {
        return repository.findById(id);
    }

    public List<Material> getMaterialesByTipo(String tipo) {
        return repository.findByTipo(tipo);
    }

    public List<Material> getMaterialesByNivel(String nivel) {
        return repository.findByNivel(nivel);
    }

    public List<Material> getMaterialesByAsignatura(String asignatura) {
        return repository.findByAsignatura(asignatura);
    }

    public List<Material> getMaterialesByEsOnline(boolean esOnline) {
        return repository.findByEsOnline(esOnline);
    }

    public List<Material> searchMaterialesByTitulo(String titulo) {
        return repository.findByTituloContainingIgnoreCase(titulo);
    }

    public Material saveMaterial(Material material, MultipartFile file) {
        try {
            if (material.isEs_online()) {
                // Si es online, verificar que tenga una URL válida
                if (material.getUrl_descarga() == null || material.getUrl_descarga().trim().isEmpty()) {
                    throw new RuntimeException("Para materiales online se requiere una URL válida");
                }
            } else {
                // Si no es online, debe tener un archivo
                if (file == null || file.isEmpty()) {
                    throw new RuntimeException("Para materiales no online se requiere un archivo");
                }
                String fileUrl = fileStorageService.storeFile(file);
                material.setUrl_descarga(fileUrl);
            }
            material.setFechaModificacion(LocalDate.now());
            return repository.save(material);
        } catch (Exception e) {
            throw new RuntimeException("Error al guardar el material: " + e.getMessage());
        }
    }

    public void deleteMaterial(int id) {
        repository.deleteById(id);
    }

    public Material updateMaterial(int id, Material material, MultipartFile file) {
        if (repository.existsById(id)) {
            try {
                if (material.isEs_online()) {
                    // Si es online, verificar que tenga una URL válida
                    if (material.getUrl_descarga() == null || material.getUrl_descarga().trim().isEmpty()) {
                        throw new RuntimeException("Para materiales online se requiere una URL válida");
                    }
                } else if (file != null && !file.isEmpty()) {
                    // Si no es online y se proporciona un archivo, actualizarlo
                    String fileUrl = fileStorageService.storeFile(file);
                    material.setUrl_descarga(fileUrl);
                }
                material.setId_material(id);
                material.setFechaModificacion(LocalDate.now());
                return repository.save(material);
            } catch (Exception e) {
                throw new RuntimeException("Error al actualizar el material: " + e.getMessage());
            }
        }
        return null;
    }
} 