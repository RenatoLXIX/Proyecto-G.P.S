package com.proyectogps.backendMedia.Model;

import java.time.LocalDate;
import java.util.List;

import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonProperty;


@Entity
@Table(name = "material")
public class Material {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_material")
    private int idMaterial;

    @Column(name = "titulo", nullable = false, length = 200)
    private String titulo;

    @Column(name = "tipo", nullable = false, length = 50)
    private String tipo;

    @Column(name = "nivel", nullable = false, length = 50)
    private String nivel;


    @Column(name = "asignatura", nullable = false, length = 100)
    private String asignatura;

    @Column(name = "descripcion", length = 1000)
    private String descripcion;

    @Column(name = "autor", length = 100)
    private String autor;


    @Column(name = "url_descarga", nullable = false, length = 255)
    private String urlDescarga;

    @Column(name = "es_online", nullable = false)
    private boolean esOnline;

    @Column(name = "fecha_modificacion", nullable = false)
    private LocalDate fechaModificacion;


    //RELACIONES CON OTRAS TABLAS

    @OneToMany(mappedBy = "material")
    private List<Evaluacion> evaluacion;



    // GETTERS AND SETTERS

    @JsonProperty("idMaterial")
    public int getIdMaterial() {
        return idMaterial;
    }

    public void setIdMaterial(int idMaterial) {
        this.idMaterial = idMaterial;
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

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public String getAutor() {
        return autor;
    }

    public void setAutor(String autor) {
        this.autor = autor;
    }

    @JsonProperty("url_descarga")
    public String getUrlDescarga() {
        return urlDescarga;
    }


    public void setUrlDescarga(String urlDescarga) {
        this.urlDescarga = urlDescarga;
    }


    @JsonProperty("esOnline")
    public boolean isEsOnline() {
        return esOnline;
    }

    public void setEsOnline(boolean esOnline) {
        this.esOnline = esOnline;
    }

    @JsonProperty("fechaCreacion")
    public LocalDate getFechaModificacion() {
        return fechaModificacion;
    }

    public void setFechaModificacion(LocalDate fechaModificacion) {
        this.fechaModificacion = fechaModificacion;
    }

    public List<Evaluacion> getEvaluacion() {
        return evaluacion;
    }

    public void setEvaluacion(List<Evaluacion> evaluacion) {
        this.evaluacion = evaluacion;
    }
}

