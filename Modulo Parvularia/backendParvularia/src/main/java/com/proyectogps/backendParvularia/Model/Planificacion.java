package com.proyectogps.backendParvularia.Model;

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
    private int idPlanificacion;

    @Column(name = "tipo", nullable = false, length = 50)
    private String tipo; // ANUAL, CLASE_A_CLASE, RUTINA_DIARIA

    @Column(name = "nivel", nullable = false, length = 50)
    private String nivel; // MEDIO_MENOR, MEDIO_MAYOR, PRE_KINDER, KINDER, NT1, NT2

    @Column(name = "area", nullable = false, length = 100)
    private String area; // LENGUAJE, MATEMATICAS, APOYO_PSICOLOGICO

    @Column(name = "ambito", length = 100)
    private String ambito;

    @Column(name = "nucleo", length = 100)
    private String nucleo;

    @Column(name = "eje", length = 100)
    private String eje;

    @Column(name = "objetivos", nullable = false, length = 500)
    private String objetivos;

    @Column(name = "actividades_variables", length = 1000)
    private String actividadesVariables;

    @Column(name = "recreos_dirigidos", length = 500)
    private String recreosDirigidos;

    @Column(name = "fecha_creacion", nullable = false)
    private LocalDate fechaCreacion;

    @Column(name = "fecha_clase")
    private LocalDate fechaClase;

    @Column(name = "es_descargable", nullable = false)
    private boolean esDescargable;

    @Column(name = "es_editable", nullable = false)
    private boolean esEditable;

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
        this.esDescargable = true;
        this.esEditable = true;
    }

    // GETTERS Y SETTERS
    public int getIdPlanificacion() {
        return idPlanificacion;
    }

    public void setIdPlanificacion(int idPlanificacion) {
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

    public String getArea() {
        return area;
    }

    public void setArea(String area) {
        this.area = area;
    }

    public String getAmbito() {
        return ambito;
    }

    public void setAmbito(String ambito) {
        this.ambito = ambito;
    }

    public String getNucleo() {
        return nucleo;
    }

    public void setNucleo(String nucleo) {
        this.nucleo = nucleo;
    }

    public String getEje() {
        return eje;
    }

    public void setEje(String eje) {
        this.eje = eje;
    }

    public String getObjetivos() {
        return objetivos;
    }

    public void setObjetivos(String objetivos) {
        this.objetivos = objetivos;
    }

    public String getActividadesVariables() {
        return actividadesVariables;
    }

    public void setActividadesVariables(String actividadesVariables) {
        this.actividadesVariables = actividadesVariables;
    }

    public String getRecreosDirigidos() {
        return recreosDirigidos;
    }

    public void setRecreosDirigidos(String recreosDirigidos) {
        this.recreosDirigidos = recreosDirigidos;
    }

    public LocalDate getFechaCreacion() {
        return fechaCreacion;
    }

    public void setFechaCreacion(LocalDate fechaCreacion) {
        this.fechaCreacion = fechaCreacion;
    }

    public LocalDate getFechaClase() {
        return fechaClase;
    }

    public void setFechaClase(LocalDate fechaClase) {
        this.fechaClase = fechaClase;
    }

    public boolean isEsDescargable() {
        return esDescargable;
    }

    public void setEsDescargable(boolean esDescargable) {
        this.esDescargable = esDescargable;
    }

    public boolean isEsEditable() {
        return esEditable;
    }

    public void setEsEditable(boolean esEditable) {
        this.esEditable = esEditable;
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