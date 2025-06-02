package com.proyectogps.backendMedia.Repository;

import com.proyectogps.backendMedia.Model.Evaluacion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface EvaluacionRepository extends JpaRepository<Evaluacion, Integer> {
    List<Evaluacion> findByTipo(String tipo);
    List<Evaluacion> findByNivel(String nivel);
    List<Evaluacion> findByAsignatura(String asignatura);
    List<Evaluacion> findByTieneSolucionario(boolean tieneSolucionario);
    List<Evaluacion> findByTiempoMinutosLessThan(int tiempoMinutos);
    List<Evaluacion> findByMaterialId(int idMaterial);
}
