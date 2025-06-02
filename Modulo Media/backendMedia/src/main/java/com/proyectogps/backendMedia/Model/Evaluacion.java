package com.proyectogps.backendMedia.Model;

import jakarta.persistence.*;

@Entity
@Table(name = "evaluacion")
public class Evaluacion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_evaluacion")
    private int id_evaluacion;

    @Column(name = "tipo", nullable = false, length = 50)
    private String tipo;

    @Column(name = "asignatura", nullable = false, length = 100)
    private String asignatura;

    @Column(name = "nivel", nullable = false, length = 50)
    private String nivel;

    @Column(name = "tiempo_minutos", nullable = false, length = 300)
    private int tiempo_minutos;

    @Column(name = "tiene_solucionario", nullable = false)
    private Boolean tiene_solucionario;

    @Column(name = "id_material", nullable = false)
    private Integer idMaterial;

    //RELACIONES

    @ManyToOne
    @JoinColumn(name = "id_material", referencedColumnName = "id_material") // Clave foránea
    private Material material;


    //GETTERS Y SETTERS
    public int getIdEvaluacion() {
        return id_evaluacion;
    }

    public void setId_evaluacion(int id_evaluacion) {
        this.id_evaluacion = id_evaluacion;
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

    public int getTiempo_minutos() {
        return tiempo_minutos;
    }

    public void setTiempo_minutos(int tiempo_minutos) {
        this.tiempo_minutos = tiempo_minutos;
    }

    public Boolean getTiene_solucionario() {
        return tiene_solucionario;
    }

    public void setTiene_solucionario(Boolean tiene_solucionario) {
        this.tiene_solucionario = tiene_solucionario;
    }

    public Material getMaterial() {
        return material;
    }

    public void setMaterial(Material material) {
        this.material = material;
    }
}
