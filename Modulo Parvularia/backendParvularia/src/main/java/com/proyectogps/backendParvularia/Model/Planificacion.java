package com.proyectogps.backendParvularia.Model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "planificiacion")
public class Planificacion {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_planificacion")
    private Integer idPlanificacion;

    @Column(name = "tipo", nullable = false, length = 50)
    private String tipo;

    @Column(name = "nivel", nullable = false, length = 50)
    private String nivel;

    @Column(name = "objetivo", nullable = false, length = 255)
    private String objetivo;


    //Relaciones

    @ManyToOne
    @JoinColumn(name = "id_material", referencedColumnName = "id_material")
    private Material material;


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

    public String getObjetivo() {
        return objetivo;
    }

    public void setObjetivo(String objetivo) {
        this.objetivo = objetivo;
    }


    
}