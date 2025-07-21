package com.proyectogps.backendBasica.Service;

import com.proyectogps.backendBasica.Model.Recurso;
import com.proyectogps.backendBasica.Repository.RecursoRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class RecursoService {

    private final RecursoRepository repository;

    public RecursoService(RecursoRepository repository) {
        this.repository = repository;
    }

    @Transactional(readOnly = true)
    public List<Recurso> getAll() {
        return repository.findAll();
    }

    @Transactional(readOnly = true)
    public Optional<Recurso> getById(Integer id) {
        return repository.findById(id);
    }

    @Transactional
    public Recurso save(Recurso recurso) {
        // Establecer fecha de creación automáticamente
        if(recurso.getFecha_creacion() == null) {
            recurso.setFecha_creacion(new Date());
        }
        return repository.save(recurso);
    }

    @Transactional(readOnly = true)
    public List<Recurso> filtrar(String tipo, String nivel, String asignatura) {
        return repository.findByTipoContainingIgnoreCaseAndNivelContainingIgnoreCaseAndAsignaturaContainingIgnoreCase(
            tipo != null ? tipo : "",
            nivel != null ? nivel : "",
            asignatura != null ? asignatura : ""
        );
    }

    @Transactional
    public Recurso createRecurso(Recurso recurso) {
        // Validación de campos obligatorios
        if (recurso.getTipo() == null || recurso.getTitulo() == null || 
            recurso.getNivel() == null || recurso.getAsignatura() == null ||
            recurso.getUrl_descarga() == null) {
            throw new IllegalArgumentException("Todos los campos obligatorios deben estar presentes: tipo, título, nivel, asignatura, url_descarga");
        }

        // Establecer fecha de creación si no viene en el request
        if(recurso.getFecha_creacion() == null) {
            recurso.setFecha_creacion(new Date());
        }

        return repository.save(recurso);
    }

    @Transactional
    public Recurso actualizar(Integer id, Recurso nuevoRecurso) {
        Recurso existente = repository.findById(id)
            .orElseThrow(() -> new RuntimeException("Recurso no encontrado con id: " + id));

        // Actualizar campos permitidos (no actualizamos la fecha de creación)
        existente.setTipo(nuevoRecurso.getTipo());
        existente.setTitulo(nuevoRecurso.getTitulo());
        existente.setNivel(nuevoRecurso.getNivel());
        existente.setAsignatura(nuevoRecurso.getAsignatura());
        existente.setUrl_descarga(nuevoRecurso.getUrl_descarga());

        return repository.save(existente);
    }

    // Métodos adicionales para búsquedas específicas
    @Transactional(readOnly = true)
    public List<Recurso> findByTipo(String tipo) {
        return repository.findByTipo(tipo);
    }

    @Transactional(readOnly = true)
    public List<Recurso> findByNivel(String nivel) {
        return repository.findByNivel(nivel);
    }

    @Transactional(readOnly = true)
    public List<Recurso> findByAsignatura(String asignatura) {
        return repository.findByAsignatura(asignatura);
    }
}