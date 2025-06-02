package com.proyectogps.backendSostenedor.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.proyectogps.backendSostenedor.Model.Asistencia;

@Repository
public interface AsistenciaRepository extends JpaRepository<Asistencia, Integer> {
	List<Asistencia> findByUsuarioIdUsuarioIn(List<Integer> ids);

}
