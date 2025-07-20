package com.proyectogps.backendSostenedor.Repository;

import com.proyectogps.backendSostenedor.Model.Usuario;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Integer> {
    // Métodos personalizados que podrías necesitar

    List<Usuario> findByTipo(String tipo);
    List<Usuario> findByEstablecimientoIdEstablecimiento(Integer idEstablecimiento);



    // Buscar por RUT
    // Optional<Usuario> findByRut(String rut);
    
    // Buscar por email
    // Optional<Usuario> findByEmail(String email);
}
