package com.proyectogps.backendMedia.Model;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "planificacion")
public class Planificacion {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_planificacion")
    private int id_planificacion;

    @Column(name = "tipo", nullable = false, length = 50)
    private String tipo;

    @Column(name = "nivel", nullable = false, length = 50)
    private String nivel;

    @Column(name = "asignatura", nullable = false, length = 100)
    private String asignatura;

    @Column(name = "objetivos", nullable = false, length = 200)
    private String objetivos;

    @Column(name = "fecha_creacion", nullable = false)
    private LocalDate fechaCreacion;

    @ManyToMany
    @JoinTable(
        name = "planificacion_material",
        joinColumns = @JoinColumn(name = "id_planificacion"),
        inverseJoinColumns = @JoinColumn(name = "id_material")
    )
    private Set<Material> materiales = new HashSet<>();

    // Constructor por defecto
    public Planificacion() {
        this.fechaCreacion = LocalDate.now();
        this.materiales = new HashSet<>();
    }

    // GETTERS Y SETTERS
    public int getId_planificacion() {
        return id_planificacion;
    }

    public void setId_planificacion(int id_planificacion) {
        this.id_planificacion = id_planificacion;
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

    public LocalDate getFechaCreacion() {
        return fechaCreacion;
    }

    public void setFechaCreacion(LocalDate fechaCreacion) {
        this.fechaCreacion = fechaCreacion;
    }

    public Set<Material> getMateriales() {
        return materiales;
    }

    public void setMateriales(Set<Material> materiales) {
        this.materiales = materiales;
    }

    // Métodos helper para la relación
    public void addMaterial(Material material) {
        this.materiales.add(material);
    }

    public void removeMaterial(Material material) {
        this.materiales.remove(material);
    }
}
