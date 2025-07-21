package com.proyectogps.backendSostenedor.DTO;

public class MensajeRequest {
    private String asunto;
    private String contenido;
    private String filtros; // Texto para describir los filtros aplicados (ej. "apoderados del establecimiento 2")
    private Integer establecimientoId; // Opcional
    private String tipoUsuario; // Opcional, por ejemplo: "apoderado", "profesor", etc.
    private Integer remitenteId; // Nuevo campo obligatorio para el remitente

    // Constructor vacío
    public MensajeRequest() {
    }

    // Constructor con todos los campos
    public MensajeRequest(String asunto, String contenido, String filtros, Integer establecimientoId, String tipoUsuario, Integer remitenteId) {
        this.asunto = asunto;
        this.contenido = contenido;
        this.filtros = filtros;
        this.establecimientoId = establecimientoId;
        this.tipoUsuario = tipoUsuario;
        this.remitenteId = remitenteId;
    }

    // Getters y setters
    public String getAsunto() {
        return asunto;
    }

    public void setAsunto(String asunto) {
        this.asunto = asunto;
    }

    public String getContenido() {
        return contenido;
    }

    public void setContenido(String contenido) {
        this.contenido = contenido;
    }

    public String getFiltros() {
        return filtros;
    }

    public void setFiltros(String filtros) {
        this.filtros = filtros;
    }

    public Integer getEstablecimientoId() {
        return establecimientoId;
    }

    public void setEstablecimientoId(Integer establecimientoId) {
        this.establecimientoId = establecimientoId;
    }

    public String getTipoUsuario() {
        return tipoUsuario;
    }

    public void setTipoUsuario(String tipoUsuario) {
        this.tipoUsuario = tipoUsuario;
    }

    public Integer getRemitenteId() {
        return remitenteId;
    }

    public void setRemitenteId(Integer remitenteId) {
        this.remitenteId = remitenteId;
    }
}
