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

    @Column(name = "tipo", nullable = false, length = 50)
    private String tipo;

    @Column(name = "nivel", nullable = false, length = 50)
    private String nivel;

    @Column(name = "asignatura", nullable = false, length = 100)
    private String asignatura;

    @Column(name = "objetivo", nullable = false, length = 200)
    private String objetivo;

    @Column(name = "id_recurso", nullable = false)
    private Integer idRecurso;

    //Relaciones

    @ManyToOne
    @JoinColumn(name = "id_recurso", referencedColumnName = "id_recurso")
    private Recurso recurso;

    // Getters and Setters

    public Integer getIdPlanificacion() {
        return idPlanificacion;
    }

    public void setIdPlanificacion(Integer idPlanificacion) {
        this.idPlanificacion = idPlanificacion;
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

    public String getObjetivo() {
        return objetivo;
    }

    public void setObjetivo(String objetivo) {
        this.objetivo = objetivo;
    }

    public Integer getIdRecurso() {
        return idRecurso;
    }

    public void setIdRecurso(Integer idRecurso) {
        this.idRecurso = idRecurso;
    }

    public Recurso getRecurso() {
        return recurso;
    }

    public void setRecurso(Recurso recurso) {
        this.recurso = recurso;
    }

    

    

}


