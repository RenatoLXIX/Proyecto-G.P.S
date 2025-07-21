package com.proyectogps.backendParvularia.Service;

import com.proyectogps.backendParvularia.Model.Planificacion;
import com.proyectogps.backendParvularia.Repository.PlanificacionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
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

    public List<Planificacion> getPlanificacionesByArea(String area) {
        return repository.findByArea(area);
    }

    public List<Planificacion> getPlanificacionesByAmbito(String ambito) {
        return repository.findByAmbito(ambito);
    }

    public List<Planificacion> getPlanificacionesByNucleo(String nucleo) {
        return repository.findByNucleo(nucleo);
    }

    public List<Planificacion> getPlanificacionesByEsDescargable(boolean esDescargable) {
        return repository.findByEsDescargable(esDescargable);
    }

    public List<Planificacion> getPlanificacionesByEsEditable(boolean esEditable) {
        return repository.findByEsEditable(esEditable);
    }

    public Planificacion savePlanificacion(Planificacion planificacion) {
        planificacion.setFechaCreacion(LocalDate.now());
        return repository.save(planificacion);
    }

    public void deletePlanificacion(int id) {
        repository.deleteById(id);
    }

    public Planificacion updatePlanificacion(int id, Planificacion planificacionDetails) {
        return repository.findById(id).map(existingPlanificacion -> {
            existingPlanificacion.setTipo(planificacionDetails.getTipo());
            existingPlanificacion.setNivel(planificacionDetails.getNivel());
            existingPlanificacion.setArea(planificacionDetails.getArea());
            existingPlanificacion.setAmbito(planificacionDetails.getAmbito());
            existingPlanificacion.setNucleo(planificacionDetails.getNucleo());
            existingPlanificacion.setEje(planificacionDetails.getEje());
            existingPlanificacion.setObjetivos(planificacionDetails.getObjetivos());
            existingPlanificacion.setActividadesVariables(planificacionDetails.getActividadesVariables());
            existingPlanificacion.setRecreosDirigidos(planificacionDetails.getRecreosDirigidos());
            existingPlanificacion.setFechaClase(planificacionDetails.getFechaClase());
            existingPlanificacion.setEsDescargable(planificacionDetails.isEsDescargable());
            existingPlanificacion.setEsEditable(planificacionDetails.isEsEditable());
            existingPlanificacion.setMateriales(planificacionDetails.getMateriales());
            
            return repository.save(existingPlanificacion);
        }).orElse(null);
    }
} 