package com.proyectogps.backendBasica.Service;

import com.proyectogps.backendBasica.Model.Recurso;

import java.util.List;
import java.util.Optional;

public interface RecursoService {
    List<Recurso> getAll();
    Optional<Recurso> getById(Integer id);
    Recurso save(Recurso recurso);
    Recurso update(Recurso recurso);
    void delete(Integer id);
}
