package com.proyectogps.backendBasica.Model;

import jakarta.persistence.*;
import java.util.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
//@Table(name = "recurso")
public class Recurso {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_recurso")
    private Integer idRecurso;

    @Column(name = "titulo", nullable = false, length = 200)
    private String titulo;

    @Column(name = "tipo", nullable = false, length = 50)
    private String tipo;

    @Column(name = "nivel", nullable = false, length = 50)
    private String nivel;

    @Column(name = "asignatura", nullable = false, length = 100)
    private String asignatura;

    @Column(name = "url_descarga", nullable = false, length = 255)
    private String url_descarga;

    @Column(name = "fecha_creacion", nullable = false)
    private Date fecha_creacion;

    //Conexciones con otras tablas

    @OneToMany(mappedBy = "recurso")
    @JsonIgnore
       private List<Planificacion> planificacion;

    //getters and setters

    public Integer getIdRecurso() {
        return idRecurso;
    }

    public void setIdRecurso(Integer idRecurso) {
        this.idRecurso = idRecurso;
    }

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public String getTipo() {
        return tipo;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    public String getNivel() {
        return nivel;
    }

    public void setNivel(String nivel) {
        this.nivel = nivel;
    }

    public String getAsignatura() {
        return asignatura;
    }

    public void setAsignatura(String asignatura) {
        this.asignatura = asignatura;
    }

    public String getUrl_descarga() {
        return url_descarga;
    }

    public void setUrl_descarga(String url_descarga) {
        this.url_descarga = url_descarga;
    }

    public Date getFecha_creacion() {
        return fecha_creacion;
    }

    public void setFecha_creacion(Date fecha_creacion) {
        this.fecha_creacion = fecha_creacion;
    }

    public List<Planificacion> getPlanificacion() {
        return planificacion;
    }

    public void setPlanificacion(List<Planificacion> planificacion) {
        this.planificacion = planificacion;
    }

    
}
