package com.proyectogps.backendSostenedor.controller;

import com.proyectogps.backendSostenedor.service.MensajeService;
import com.proyectogps.backendSostenedor.DTO.MensajeRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/mensajes")
public class MensajeController {

    @Autowired
    private MensajeService mensajeService;

    @PostMapping("/enviar")
public ResponseEntity<String> enviarMensaje(@RequestBody MensajeRequest mensajeDTO) {
    try {
        mensajeService.enviarMensajeFiltrado(mensajeDTO);
        return ResponseEntity.ok("Mensaje enviado correctamente");
    } catch (Exception e) {
        return ResponseEntity.status(500).body("Error al enviar el mensaje: " + e.getMessage());
    }
}

}
