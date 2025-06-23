package com.proyectogps.backendMedia.Model;

import jakarta.persistence.*;

@Entity
@Table(name = "evaluacion")
public class Evaluacion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_evaluacion")
    private int idEvaluacion;

    @Column(name = "tipo", nullable = false, length = 50)
    private String tipo;

    @Column(name = "asignatura", nullable = false, length = 100)
    private String asignatura;

    @Column(name = "nivel", nullable = false, length = 50)
    private String nivel;

    @Column(name = "tiempo_minutos", nullable = false, length = 300)
    private int tiempoMinutos;

    @Column(name = "tiene_solucionario", nullable = false)
    private Boolean tieneSolucionario;

    //RELACIONES

    @ManyToOne
    @JoinColumn(name = "id_material", referencedColumnName = "id_material", nullable = false) // Clave foránea
    private Material material;


    //GETTERS Y SETTERS
    public int getIdEvaluacion() {
        return idEvaluacion;
    }

    public void setIdEvaluacion(int idEvaluacion) {
        this.idEvaluacion = idEvaluacion;
    }

    public String getTipo() {
        return tipo;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    public String getAsignatura() {
        return asignatura;
    }

    public void setAsignatura(String asignatura) {
        this.asignatura = asignatura;
    }

    public String getNivel() {
        return nivel;
    }

    public void setNivel(String nivel) {
        this.nivel = nivel;
    }

    public int getTiempoMinutos() {
        return tiempoMinutos;
    }

    public void setTiempoMinutos(int tiempoMinutos) {
        this.tiempoMinutos = tiempoMinutos;
    }

    public Boolean getTieneSolucionario() {
        return tieneSolucionario;
    }

    public void setTieneSolucionario(Boolean tieneSolucionario) {
        this.tieneSolucionario = tieneSolucionario;
    }

    public Material getMaterial() {
        return material;
    }

    public void setMaterial(Material material) {
        this.material = material;
    }
}
