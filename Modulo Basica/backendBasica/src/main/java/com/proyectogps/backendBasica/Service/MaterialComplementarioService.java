package com.proyectogps.backendBasica.Service;

import com.proyectogps.backendBasica.Model.MaterialComplementario;
import com.proyectogps.backendBasica.Repository.MaterialComplementarioRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class MaterialComplementarioService {

    private final MaterialComplementarioRepository repository;

    public MaterialComplementarioService(MaterialComplementarioRepository repository) {
        this.repository = repository;
    }

    @Transactional(readOnly = true)
    public List<MaterialComplementario> getAll() {
        return repository.findAll();
    }

    @Transactional(readOnly = true)
    public Optional<MaterialComplementario> getById(Integer id) {
        return repository.findById(id);
    }

    @Transactional
    public MaterialComplementario save(MaterialComplementario material) {
        return repository.save(material);
    }

    @Transactional(readOnly = true)
    public List<MaterialComplementario> filtrar(String tipo, String nivel, String asignatura) {
        return repository.findByTipoContainingIgnoreCaseAndNivelContainingIgnoreCaseAndAsignaturaContainingIgnoreCase(
            tipo != null ? tipo : "",
            nivel != null ? nivel : "",
            asignatura != null ? asignatura : ""
        );
    }

    @Transactional
    public MaterialComplementario createMaterial(MaterialComplementario material) {
        if (material.getTipo() == null || material.getTitulo() == null || 
            material.getDescripcion() == null || material.getUrl_acceso() == null ||
            material.getAsignatura() == null || material.getNivel() == null) {
            throw new IllegalArgumentException("Todos los campos son obligatorios.");
        }
        return repository.save(material);
    }

    @Transactional
    public MaterialComplementario actualizar(Integer id, MaterialComplementario nuevoMaterial) {
        MaterialComplementario existente = repository.findById(id)
            .orElseThrow(() -> new RuntimeException("Material no encontrado con id: " + id));

        existente.setTipo(nuevoMaterial.getTipo());
        existente.setTitulo(nuevoMaterial.getTitulo());
        existente.setDescripcion(nuevoMaterial.getDescripcion());
        existente.setUrl_acceso(nuevoMaterial.getUrl_acceso());
        existente.setAsignatura(nuevoMaterial.getAsignatura());
        existente.setNivel(nuevoMaterial.getNivel());

        return repository.save(existente);
    }
}