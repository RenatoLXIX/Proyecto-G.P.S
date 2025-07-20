package com.proyectogps.backendSostenedor.DTO;

public class InformeGeneralDTO {
    private String nombreEstablecimiento;
    private double porcentajeAsistencia;
    private double porcentajeInasistencia;
    private double promedioNotas;

    // Constructor
    public InformeGeneralDTO(String nombreEstablecimiento, double porcentajeAsistencia, double porcentajeInasistencia, double promedioNotas) {
        this.nombreEstablecimiento = nombreEstablecimiento;
        this.porcentajeAsistencia = porcentajeAsistencia;
        this.porcentajeInasistencia = porcentajeInasistencia;
        this.promedioNotas = promedioNotas;
    }

    // Getters y Setters

    public String getNombreEstablecimiento() {
        return nombreEstablecimiento;
    }

    public void setNombreEstablecimiento(String nombreEstablecimiento) {
        this.nombreEstablecimiento = nombreEstablecimiento;
    }

    public double getPorcentajeAsistencia() {
        return porcentajeAsistencia;
    }

    public void setPorcentajeAsistencia(double porcentajeAsistencia) {
        this.porcentajeAsistencia = porcentajeAsistencia;
    }

    public double getPorcentajeInasistencia() {
        return porcentajeInasistencia;
    }

    public void setPorcentajeInasistencia(double porcentajeInasistencia) {
        this.porcentajeInasistencia = porcentajeInasistencia;
    }

    public double getPromedioNotas() {
        return promedioNotas;
    }

    public void setPromedioNotas(double promedioNotas) {
        this.promedioNotas = promedioNotas;
    }
}