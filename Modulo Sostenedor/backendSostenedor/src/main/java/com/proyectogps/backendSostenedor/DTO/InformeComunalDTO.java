package com.proyectogps.backendSostenedor.DTO;

public class InformeComunalDTO {
    private String nombreEstablecimiento;
    private long totalMatriculados;
    private long cantidadExtranjeros;
    private long cantidadRetirados;
    private long cantidadRepitencias;

    // Constructor
    public InformeComunalDTO(String nombreEstablecimiento, long totalMatriculados, long cantidadExtranjeros, long cantidadRetirados, long cantidadRepitencias) {
        this.nombreEstablecimiento = nombreEstablecimiento;
        this.totalMatriculados = totalMatriculados;
        this.cantidadExtranjeros = cantidadExtranjeros;
        this.cantidadRetirados = cantidadRetirados;
        this.cantidadRepitencias = cantidadRepitencias;
    }

    // Getters y Setters

    public String getNombreEstablecimiento() {
        return nombreEstablecimiento;
    }

    public void setNombreEstablecimiento(String nombreEstablecimiento) {
        this.nombreEstablecimiento = nombreEstablecimiento;
    }

    public long getTotalMatriculados() {
        return totalMatriculados;
    }

    public void setTotalMatriculados(long totalMatriculados) {
        this.totalMatriculados = totalMatriculados;
    }

    public long getCantidadExtranjeros() {
        return cantidadExtranjeros;
    }

    public void setCantidadExtranjeros(long cantidadExtranjeros) {
        this.cantidadExtranjeros = cantidadExtranjeros;
    }

    public long getCantidadRetirados() {
        return cantidadRetirados;
    }

    public void setCantidadRetirados(long cantidadRetirados) {
        this.cantidadRetirados = cantidadRetirados;
    }

    public long getCantidadRepitencias() {
        return cantidadRepitencias;
    }

    public void setCantidadRepitencias(long cantidadRepitencias) {
        this.cantidadRepitencias = cantidadRepitencias;
    }
}
