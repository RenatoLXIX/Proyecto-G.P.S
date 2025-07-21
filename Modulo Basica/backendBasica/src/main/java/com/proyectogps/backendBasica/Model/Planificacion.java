package com.proyectogps.backendBasica.Model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
//@Table(name = "planificiacion")
public class Planificacion {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_planificacion")
    private Integer idPlanificacion;

    @Column(name = "titulo", nullable = false, length = 50)
    private String titulo;

     @Column(name = "descripcion", nullable = false, length = 300)
    private String descripcion;

    @Column(name = "nivel", nullable = false, length = 50)
    private String nivel;

    @Column(name = "clasificacionDUA", nullable = false, length = 50)
    private String clasificacionDUA; // Representación, etc.

    @Column(name = "articulo", nullable = false, length = 50)
    private String articulo;

    @Column(name = "asignatura", nullable = false, length = 100)
    private String asignatura;


    //Relaciones

    @ManyToOne
    @JoinColumn(name = "id_recurso", referencedColumnName = "id_recurso")
    private Recurso recurso;

    @ManyToOne
    @JoinColumn(name = "id_material", referencedColumnName = "id_material")
    private MaterialComplementario materialComplementario;


    // Getters y Setters
    public Integer getIdPlanificacion() {
        return idPlanificacion;
    }

    public void setIdPlanificacion(Integer idPlanificacion) {
        this.idPlanificacion = idPlanificacion;
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

    public String getNivel() {
        return nivel;
    }

    public void setNivel(String nivel) {
        this.nivel = nivel;
    }

    public String getClasificacionDUA() {
        return clasificacionDUA;
    }

    public void setClasificacionDUA(String clasificacionDUA) {
        this.clasificacionDUA = clasificacionDUA;
    }

    public String getArticulo() {
        return articulo;
    }

    public void setArticulo(String articulo) {
        this.articulo = articulo;
    }

    public String getAsignatura() {
        return asignatura;
    }

    public void setAsignatura(String asignatura) {
        this.asignatura = asignatura;
    }

    public Recurso getRecurso() {
        return recurso;
    }

    public void setRecurso(Recurso recurso) {
        this.recurso = recurso;
    }

    public MaterialComplementario getMaterialComplementario() {
        return materialComplementario;
    }

    public void setMaterialComplementario(MaterialComplementario materialComplementario) {
        this.materialComplementario = materialComplementario;
    }

    //Getters y Setters

    
    
}