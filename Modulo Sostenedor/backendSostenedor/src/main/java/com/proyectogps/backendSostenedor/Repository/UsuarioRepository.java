package com.proyectogps.backendSostenedor.Repository;

import com.proyectogps.backendSostenedor.Model.Usuario;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Integer> {
 
    List<Usuario> findByNombreContainingIgnoreCaseAndTipo(String nombre, String tipo);
    List<Usuario> findByNombreContainingIgnoreCase(String nombre);
    List<Usuario> findByTipo(String tipo);
    List<Usuario> findByEstablecimientoIdEstablecimiento(Integer idEstablecimiento);

    @Query("SELECT u FROM Usuario u WHERE " +
           "(:tipo IS NULL OR u.tipo = :tipo) AND " +
           "(:establecimientoId IS NULL OR u.establecimiento.idEstablecimiento = :establecimientoId)")
    List<Usuario> findByTipoAndEstablecimientoOptional(
        @Param("tipo") String tipo,
        @Param("establecimientoId") Integer establecimientoId
    );
}
