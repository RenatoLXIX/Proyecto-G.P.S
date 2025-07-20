package com.proyectogps.backendSostenedor.Repository;

import com.proyectogps.backendSostenedor.Model.Mensaje;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MensajeRepository extends JpaRepository<Mensaje, Long> {
}
