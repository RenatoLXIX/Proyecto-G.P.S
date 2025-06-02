package com.proyectogps.backendBasica.Service;

import com.proyectogps.backendBasica.Model.Planificacion;

import java.util.List;
import java.util.Optional;

public interface PlanificacionService {
    List<Planificacion> getAll();
    Optional<Planificacion> getById(Integer id);
    Planificacion save(Planificacion planificacion);
    Planificacion update(Planificacion planificacion);
    void delete(Integer id);
}
