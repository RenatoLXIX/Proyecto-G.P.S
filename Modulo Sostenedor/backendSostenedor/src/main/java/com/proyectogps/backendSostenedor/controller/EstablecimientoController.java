package com.proyectogps.backendSostenedor.controller;

import com.proyectogps.backendSostenedor.DTO.InformeGeneralDTO;
import com.proyectogps.backendSostenedor.service.EstablecimientoService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/establecimientos")
public class EstablecimientoController {

    @Autowired
    private EstablecimientoService establecimientoService;

    @GetMapping("/{id}/informe")
    public InformeGeneralDTO generarInformeGeneral(@PathVariable Integer id) {
        return establecimientoService.generarInformeGeneral(id);
    }
}
