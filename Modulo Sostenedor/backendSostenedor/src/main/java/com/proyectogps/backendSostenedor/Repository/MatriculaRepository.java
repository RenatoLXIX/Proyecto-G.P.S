package com.proyectogps.backendSostenedor.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.proyectogps.backendSostenedor.Model.Matricula;

@Repository
public interface MatriculaRepository extends JpaRepository<Matricula, Integer> {

    // Este método buscará todas las matrículas asociadas a un conjunto de usuarios
    List<Matricula> findAllByUsuarioIdUsuarioIn(List<Integer> idsUsuarios);
}

