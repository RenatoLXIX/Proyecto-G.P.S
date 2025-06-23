package com.proyectogps.backendMedia.Service;

import com.proyectogps.backendMedia.Model.Planificacion;
import com.proyectogps.backendMedia.Repository.PlanificacionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class PlanificacionService {

    @Autowired
    private PlanificacionRepository repository;

    public List<Planificacion> getAllPlanificaciones() {
        return repository.findAll();
    }

    public Optional<Planificacion> getPlanificacionById(int id) {
        return repository.findById(id);
    }

    public List<Planificacion> getPlanificacionesByTipo(String tipo) {
        return repository.findByTipo(tipo);
    }

    public List<Planificacion> getPlanificacionesByNivel(String nivel) {
        return repository.findByNivel(nivel);
    }

    public List<Planificacion> getPlanificacionesByAsignatura(String asignatura) {
        return repository.findByAsignatura(asignatura);
    }

    public List<Planificacion> searchPlanificacionesByObjetivos(String objetivos) {
        return repository.findByObjetivosContainingIgnoreCase(objetivos);
    }

    public Planificacion savePlanificacion(Planificacion planificacion) {
        return repository.save(planificacion);
    }

    public void deletePlanificacion(int id) {
        repository.deleteById(id);
    }

    public Planificacion updatePlanificacion(int id, Planificacion planificacion) {
        if (repository.existsById(id)) {
            planificacion.setIdPlanificacion(id);
            return repository.save(planificacion);
        }
        return null;
    }
} 