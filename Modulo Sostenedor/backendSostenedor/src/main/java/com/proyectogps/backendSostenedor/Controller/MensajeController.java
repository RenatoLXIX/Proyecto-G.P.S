package com.proyectogps.backendSostenedor.controller;
import java.util.Date;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.proyectogps.backendSostenedor.Model.Mensaje;
import com.proyectogps.backendSostenedor.Model.Usuario;
import com.proyectogps.backendSostenedor.Repository.MensajeRepository;
import com.proyectogps.backendSostenedor.Repository.UsuarioRepository;

@RestController
@RequestMapping("/mensajes")
public class MensajeController {

    @Autowired
    private MensajeRepository mensajeRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    /**
     * Enviar mensaje con filtros: perfil, establecimiento
     */
    @PostMapping("/enviar")
    public ResponseEntity<?> enviarMensaje(
            @RequestParam String asunto,
            @RequestParam String contenido,
            @RequestParam String filtroTipo,  // Ej: "apoderado", "profesor", etc.
            @RequestParam(required = false) Integer establecimientoId,
            @RequestParam Integer remitenteId
    ) {
        // Obtener usuarios según filtro
        List<Usuario> destinatarios;

        if (establecimientoId != null) {
            destinatarios = usuarioRepository.findByEstablecimientoIdEstablecimiento(establecimientoId)
                .stream()
                .filter(u -> u.getTipo().equalsIgnoreCase(filtroTipo))
                .collect(Collectors.toList());
        } else {
            destinatarios = usuarioRepository.findByTipo(filtroTipo);
        }

        // Validar
        if (destinatarios.isEmpty()) {
            return ResponseEntity.badRequest().body("No se encontraron usuarios con esos filtros");
        }

        // Crear mensaje para cada usuario
        for (Usuario destinatario : destinatarios) {
            Mensaje mensaje = new Mensaje();
            mensaje.setAsunto(asunto);
            mensaje.setContenido(contenido);  // Este campo debería ser `String`, no `Date`
            mensaje.setFecha_envio(new Date());
            mensaje.setRemitente_id(remitenteId);
            mensaje.setFiltros(filtroTipo + (establecimientoId != null ? "_establecimiento_" + establecimientoId : ""));
            mensaje.setUsuario(destinatario);

            mensajeRepository.save(mensaje);
        }

        return ResponseEntity.ok("Mensaje enviado a " + destinatarios.size() + " usuarios");
    }
}
