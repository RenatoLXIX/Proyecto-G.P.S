package com.proyectogps.backendSostenedor.service;

import com.proyectogps.backendSostenedor.Model.Mensaje;
import com.proyectogps.backendSostenedor.Model.Usuario;
import com.proyectogps.backendSostenedor.Repository.MensajeRepository;
import com.proyectogps.backendSostenedor.Repository.UsuarioRepository;
import com.proyectogps.backendSostenedor.DTO.MensajeRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class MensajeService {

    @Autowired
    private MensajeRepository mensajeRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    public void enviarMensajeFiltrado(MensajeRequest mensajeRequest) {
        // Buscar destinatarios según filtros (puedes manejar el caso null o vacío)
        List<Usuario> destinatarios = usuarioRepository.findByTipoAndEstablecimientoOptional(
            mensajeRequest.getTipoUsuario(),
            mensajeRequest.getEstablecimientoId()
        );

        if (destinatarios == null || destinatarios.isEmpty()) {
            // Opcional: lanzar excepción o loggear que no hay destinatarios
            return;
        }

        for (Usuario usuario : destinatarios) {
            Mensaje mensaje = new Mensaje();
            mensaje.setAsunto(mensajeRequest.getAsunto());
            mensaje.setContenido(mensajeRequest.getContenido());
            mensaje.setFiltros(mensajeRequest.getFiltros());
            mensaje.setFechaEnvio(LocalDateTime.now());
            mensaje.setUsuario(usuario);
            mensajeRepository.save(mensaje);
        }
    }
}
