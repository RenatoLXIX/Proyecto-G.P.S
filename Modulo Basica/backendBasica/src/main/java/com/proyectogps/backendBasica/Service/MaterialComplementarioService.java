package com.proyectogps.backendBasica.Service;

import com.proyectogps.backendBasica.Model.MaterialComplementario;

import java.util.List;
import java.util.Optional;

public interface MaterialComplementarioService {
    List<MaterialComplementario> getAll();
    Optional<MaterialComplementario> getById(Integer id);
    MaterialComplementario save(MaterialComplementario material);
    MaterialComplementario update(MaterialComplementario material);
    void delete(Integer id);
}
