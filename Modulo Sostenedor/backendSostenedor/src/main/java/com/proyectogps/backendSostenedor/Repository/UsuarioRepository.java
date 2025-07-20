package com.proyectogps.backendSostenedor.Repository;

import com.proyectogps.backendSostenedor.Model.Usuario;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Integer> {
 
    List<Usuario> findByNombreContainingIgnoreCaseAndTipo(String nombre, String tipo);
    List<Usuario> findByNombreContainingIgnoreCase(String nombre);
    List<Usuario> findByTipo(String tipo);
    List<Usuario> findByEstablecimientoIdEstablecimiento(Integer idEstablecimiento);

}
