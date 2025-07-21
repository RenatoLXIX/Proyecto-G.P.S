package com.proyectogps.backendMedia.Model;

import jakarta.persistence.*;
import java.time.LocalDate;

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

    @Column(name = "descripcion", length = 1000)
    private String descripcion;

    @Column(name = "tiempo_minutos", nullable = false)
    private int tiempoMinutos;

    @Column(name = "tiene_solucionario", nullable = false)
    private Boolean tieneSolucionario;

    @Column(name = "tipo_recurso", nullable = false, length = 20)
    private String tipoRecurso;

    @Column(name = "url_recurso", length = 500)
    private String urlRecurso;

    @Column(name = "nombre_archivo", length = 255)
    private String nombreArchivo;

    @Column(name = "fecha_creacion")
    private LocalDate fechaCreacion;

    //RELACIONES

    @ManyToOne
    @JoinColumn(name = "id_material", referencedColumnName = "id_material", nullable = true) 
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

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
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

    public String getTipoRecurso() {
        return tipoRecurso;
    }

    public void setTipoRecurso(String tipoRecurso) {
        this.tipoRecurso = tipoRecurso;
    }

    public String getUrlRecurso() {
        return urlRecurso;
    }

    public void setUrlRecurso(String urlRecurso) {
        this.urlRecurso = urlRecurso;
    }

    public String getNombreArchivo() {
        return nombreArchivo;
    }

    public void setNombreArchivo(String nombreArchivo) {
        this.nombreArchivo = nombreArchivo;
    }

    public LocalDate getFechaCreacion() {
        return fechaCreacion;
    }

    public void setFechaCreacion(LocalDate fechaCreacion) {
        this.fechaCreacion = fechaCreacion;
    }

    public Material getMaterial() {
        return material;
    }

    public void setMaterial(Material material) {
        this.material = material;
    }
}
