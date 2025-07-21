package com.proyectogps.backendBasica.Service;

import com.proyectogps.backendBasica.Model.Planificacion;
import com.proyectogps.backendBasica.Repository.PlanificacionRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class PlanificacionService {

    private final PlanificacionRepository repository;

    public PlanificacionService(PlanificacionRepository repository) {
        this.repository = repository;
    }

    @Transactional(readOnly = true)
    public List<Planificacion> getAll() {
        return repository.findAll();
    }

    @Transactional(readOnly = true)
    public Optional<Planificacion> getById(Integer id) {
        return repository.findById(id);
    }

    @Transactional
    public Planificacion save(Planificacion planificacion) {
        return repository.save(planificacion);
    }

    @Transactional(readOnly = true)
    public List<Planificacion> filtrar(String nivel, String clasificacionDUA, String articulo, String asignatura) {
        return repository.findByNivelContainingIgnoreCaseAndClasificacionDUAContainingIgnoreCaseAndArticuloContainingIgnoreCaseAndAsignaturaContainingIgnoreCase(
            nivel != null ? nivel : "",
            clasificacionDUA != null ? clasificacionDUA : "",
            articulo != null ? articulo : "",
            asignatura != null ? asignatura : ""
        );
    }

    @Transactional
    public Planificacion createPlanificacion(Planificacion planificacion) {
        // Validación de campos obligatorios
        if (planificacion.getTitulo() == null || planificacion.getDescripcion() == null || 
            planificacion.getNivel() == null || planificacion.getClasificacionDUA() == null ||
            planificacion.getArticulo() == null || planificacion.getAsignatura() == null) {
            throw new IllegalArgumentException("Todos los campos obligatorios deben estar presentes");
        }

        return repository.save(planificacion);
    }

    @Transactional
    public Planificacion actualizar(Integer id, Planificacion nuevaPlanificacion) {
        Planificacion existente = repository.findById(id)
            .orElseThrow(() -> new RuntimeException("Planificación no encontrada con id: " + id));

        // Actualizar campos permitidos
        existente.setTitulo(nuevaPlanificacion.getTitulo());
        existente.setDescripcion(nuevaPlanificacion.getDescripcion());
        existente.setNivel(nuevaPlanificacion.getNivel());
        existente.setClasificacionDUA(nuevaPlanificacion.getClasificacionDUA());
        existente.setArticulo(nuevaPlanificacion.getArticulo());
        existente.setAsignatura(nuevaPlanificacion.getAsignatura());
        existente.setRecurso(nuevaPlanificacion.getRecurso());
        existente.setMaterialComplementario(nuevaPlanificacion.getMaterialComplementario());

        return repository.save(existente);
    }

    // Métodos adicionales para búsquedas específicas
    @Transactional(readOnly = true)
    public List<Planificacion> findByNivel(String nivel) {
        return repository.findByNivel(nivel);
    }

    @Transactional(readOnly = true)
    public List<Planificacion> findByAsignatura(String asignatura) {
        return repository.findByAsignatura(asignatura);
    }

    @Transactional(readOnly = true)
    public List<Planificacion> findByRecurso(Integer idRecurso) {
        return repository.findByRecursoIdRecurso(idRecurso);
    }

    @Transactional(readOnly = true)
    public List<Planificacion> findByMaterialComplementario(Integer idMaterial) {
        return repository.findByMaterialComplementarioIdMaterial(idMaterial);
    }
}