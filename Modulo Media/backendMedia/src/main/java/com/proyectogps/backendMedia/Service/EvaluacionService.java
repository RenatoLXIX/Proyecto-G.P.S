package com.proyectogps.backendMedia.Service;

import com.proyectogps.backendMedia.Model.Evaluacion;
import com.proyectogps.backendMedia.Repository.EvaluacionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class EvaluacionService {

    @Autowired
    private EvaluacionRepository repository;

    public List<Evaluacion> getAllEvaluaciones() {
        return repository.findAll();
    }

    public Optional<Evaluacion> getEvaluacionById(Integer id) {
        return repository.findById(id);
    }

    public List<Evaluacion> getEvaluacionesByTipo(String tipo) {
        return repository.findByTipo(tipo);
    }

    public List<Evaluacion> getEvaluacionesByNivel(String nivel) {
        return repository.findByNivel(nivel);
    }

    public List<Evaluacion> getEvaluacionesByAsignatura(String asignatura) {
        return repository.findByAsignatura(asignatura);
    }

    public List<Evaluacion> getEvaluacionesByTieneSolucionario(boolean tieneSolucionario) {
        return repository.findByTieneSolucionario(tieneSolucionario);
    }

    public List<Evaluacion> getEvaluacionesByTiempoMenorA(int tiempoMinutos) {
        return repository.findByTiempoMinutosLessThan(tiempoMinutos);
    }

    public List<Evaluacion> getEvaluacionesByMaterialId(Integer idMaterial) {
        return repository.findByMaterialId(idMaterial);
    }

    public Evaluacion saveEvaluacion(Evaluacion evaluacion) {
        return repository.save(evaluacion);
    }

    public void deleteEvaluacion(Integer id) {
        repository.deleteById(id);
    }

    public Evaluacion updateEvaluacion(Integer id, Evaluacion evaluacion) {
        if (repository.existsById(id)) {
            evaluacion.setId_evaluacion(id);
            return repository.save(evaluacion);
        }
        return null;
    }
} 