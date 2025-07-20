package com.proyectogps.backendSostenedor.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.proyectogps.backendSostenedor.Model.Usuario;
import com.proyectogps.backendSostenedor.Repository.UsuarioRepository;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    public List<Usuario> buscarUsuarios(String nombre, String tipo) {
        if (nombre != null && tipo != null) {
            return usuarioRepository.findByNombreContainingIgnoreCaseAndTipo(nombre, tipo);
        } else if (nombre != null) {
            return usuarioRepository.findByNombreContainingIgnoreCase(nombre);
        } else if (tipo != null) {
            return usuarioRepository.findByTipo(tipo);
        } else {
            return usuarioRepository.findAll();
        }
    }
}
