package com.proyectogps.backendMedia.Model;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;


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

    @Column(name = "objetivos", nullable = false, length = 200)
    private String objetivos;

    @Column(name = "recursos_adicionales", nullable = false, length = 255)
    private String recursos_adicionales;


    //RELACIONES



    // GETTERS Y SETTERS
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

    public String getObjetivos() {
        return objetivos;
    }

    public void setObjetivos(String objetivos) {
        this.objetivos = objetivos;
    }

    public String getRecursos_adicionales() {
        return recursos_adicionales;
    }

    public void setRecursos_adicionales(String recursos_adicionales) {
        this.recursos_adicionales = recursos_adicionales;
    }
   


   

    

    
}
