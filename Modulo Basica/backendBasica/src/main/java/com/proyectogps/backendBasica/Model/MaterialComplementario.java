package com.proyectogps.backendBasica.Model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
//@Table(name = "materialcomplementario")
public class MaterialComplementario {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_material")
    private Integer idMaterial;

    @Column(name = "tipo", nullable = false, length = 50)
    private String tipo;

    @Column(name = "titulo", nullable = false, length = 200)
    private String titulo;

    @Column(name = "descripcion", nullable = false, length = 200)
    private String descripcion;

    @Column(name = "url_acceso", nullable = false, length = 255)
    private String url_acceso;

    @Column(name = "asignatura", nullable = false, length = 100)
    private String asignatura;

    @Column(name = "nivel_recomendado", nullable = false, length = 50)
    private Integer nivel_recomendado;



    // Getters and Setters
    public Integer getIdMaterial() {
        return idMaterial;
    }

    public void setIdMaterial(Integer idMaterial) {
        this.idMaterial = idMaterial;
    }

    public String getTipo() {
        return tipo;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public String getUrl_acceso() {
        return url_acceso;
    }

    public void setUrl_acceso(String url_acceso) {
        this.url_acceso = url_acceso;
    }

    public String getAsignatura() {
        return asignatura;
    }

    public void setAsignatura(String asignatura) {
        this.asignatura = asignatura;
    }

    public Integer getNivel_recomendado() {
        return nivel_recomendado;
    }

    public void setNivel_recomendado(Integer nivel_recomendado) {
        this.nivel_recomendado = nivel_recomendado;
    }
}