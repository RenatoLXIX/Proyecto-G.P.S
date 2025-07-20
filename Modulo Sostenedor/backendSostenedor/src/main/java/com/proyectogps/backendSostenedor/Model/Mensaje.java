package com.proyectogps.backendSostenedor.Model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "mensaje") // Especificar el nombre de la tabla para evitar confusión
public class Mensaje {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_mensaje") // Coincide con la columna PK en la tabla
    private Long id;

    @Column(name = "asunto")
    private String asunto;

    @Column(name = "contenido")
    private String contenido;

    @Column(name = "filtros")
    private String filtros;

    @Column(name = "fecha_envio")
    private LocalDateTime fechaEnvio;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_usuario", nullable = false) // FK hacia usuario
    private Usuario usuario;

    // Getters y setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

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

    public LocalDateTime getFechaEnvio() {
        return fechaEnvio;
    }

    public void setFechaEnvio(LocalDateTime fechaEnvio) {
        this.fechaEnvio = fechaEnvio;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }
}
