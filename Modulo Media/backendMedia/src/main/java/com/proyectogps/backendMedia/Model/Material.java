package com.proyectogps.backendMedia.Model;

import java.time.LocalDate;
import java.util.List;

import jakarta.persistence.*;


@Entity
@Table(name = "material")
public class Material {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_material")
    private int id_material;

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

    @Column(name = "es_online", nullable = false)
    private boolean es_online;

    @Column(name = "fecha_modificacion", nullable = false)
    private LocalDate fechaModificacion;


    //RELACIONES CON OTRAS TABLAS

    @OneToMany(mappedBy = "material")
    private List<Evaluacion> evaluacion;



    // GETTERS AND SETTERS

    public int getId_material() {
        return id_material;
    }

    public void setId_material(int id_material) {
        this.id_material = id_material;
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


    public boolean isEs_online() {
        return es_online;
    }

    public void setEs_online(Boolean es_online) {
        this.es_online = es_online;
    }

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

