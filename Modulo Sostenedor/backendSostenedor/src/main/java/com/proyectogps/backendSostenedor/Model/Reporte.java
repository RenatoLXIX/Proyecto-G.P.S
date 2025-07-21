package com.proyectogps.backendSostenedor.Model;

import java.sql.Date;
import jakarta.persistence.*;

@Entity
public class Reporte {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_reporte")
    private Integer idReporte;

    @Column(name = "tipo", nullable = false, length = 100)
    private String tipo;

    @Column(name = "fecha_generacion", nullable = false)
    private Date fecha_generacion;

    @Column(name = "datos", nullable = false, length = 200)
    private String datos;

    // RELACIONES
    @ManyToOne
    @JoinColumn(name = "id_establecimiento", referencedColumnName = "id_establecimiento")
    private Establecimiento establecimiento;

    // GETTERS AND SETTERS
    public Integer getIdReporte() {
        return idReporte;
    }

    public void setIdReporte(Integer idReporte) {
        this.idReporte = idReporte;
    }

    public String getTipo() {
        return tipo;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    public Date getFecha_generacion() {
        return fecha_generacion;
    }

    public void setFecha_generacion(Date fecha_generacion) {
        this.fecha_generacion = fecha_generacion;
    }

    public String getDatos() {
        return datos;
    }

    public void setDatos(String datos) {
        this.datos = datos;
    }

    public Establecimiento getEstablecimiento() {
        return establecimiento;
    }

    public void setEstablecimiento(Establecimiento establecimiento) {
        this.establecimiento = establecimiento;
    }
}
