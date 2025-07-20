package com.proyectogps.backendMedia.Service;

import com.proyectogps.backendMedia.Model.Evaluacion;
import com.proyectogps.backendMedia.Repository.EvaluacionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class EvaluacionService {

    @Autowired
    private EvaluacionRepository repository;

    @Autowired
    private FileStorageService fileStorageService;

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
        return repository.findByMaterial_IdMaterial(idMaterial);
    }

    public Evaluacion saveEvaluacion(Evaluacion evaluacion, MultipartFile file) {
        try {
            if ("LOCAL".equals(evaluacion.getTipoRecurso())) {
                // Si es local, debe tener un archivo
                if (file == null || file.isEmpty()) {
                    throw new RuntimeException("Para evaluaciones locales se requiere un archivo");
                }
                String fileUrl = fileStorageService.storeFile(file);
                evaluacion.setUrlRecurso(fileUrl);
                evaluacion.setNombreArchivo(file.getOriginalFilename());
            } else {
                // Si es URL, verificar que tenga una URL válida
                if (evaluacion.getUrlRecurso() == null || evaluacion.getUrlRecurso().trim().isEmpty()) {
                    throw new RuntimeException("Para evaluaciones con URL se requiere una URL válida");
                }
            }
            
            evaluacion.setFechaCreacion(LocalDate.now());
            return repository.save(evaluacion);
        } catch (Exception e) {
            throw new RuntimeException("Error al guardar la evaluación: " + e.getMessage());
        }
    }

    public void deleteEvaluacion(Integer id) {
        repository.deleteById(id);
    }

    public Evaluacion updateEvaluacion(Integer id, Evaluacion evaluacion, MultipartFile file) {
        return repository.findById(id).map(existingEvaluacion -> {
            try {
                existingEvaluacion.setTipo(evaluacion.getTipo());
                existingEvaluacion.setNivel(evaluacion.getNivel());
                existingEvaluacion.setAsignatura(evaluacion.getAsignatura());
                existingEvaluacion.setDescripcion(evaluacion.getDescripcion());
                existingEvaluacion.setTiempoMinutos(evaluacion.getTiempoMinutos());
                existingEvaluacion.setTieneSolucionario(evaluacion.getTieneSolucionario());
                existingEvaluacion.setTipoRecurso(evaluacion.getTipoRecurso());
                existingEvaluacion.setMaterial(evaluacion.getMaterial());

                if ("LOCAL".equals(evaluacion.getTipoRecurso())) {
                    if (file != null && !file.isEmpty()) {
                        String fileUrl = fileStorageService.storeFile(file);
                        existingEvaluacion.setUrlRecurso(fileUrl);
                        existingEvaluacion.setNombreArchivo(file.getOriginalFilename());
                    }
                } else {
                    if (evaluacion.getUrlRecurso() != null && !evaluacion.getUrlRecurso().trim().isEmpty()) {
                        existingEvaluacion.setUrlRecurso(evaluacion.getUrlRecurso());
                    }
                }
                
                existingEvaluacion.setFechaCreacion(LocalDate.now());
                return repository.save(existingEvaluacion);
            } catch (Exception e) {
                throw new RuntimeException("Error al actualizar la evaluación: " + e.getMessage());
            }
        }).orElse(null);
    }
} 