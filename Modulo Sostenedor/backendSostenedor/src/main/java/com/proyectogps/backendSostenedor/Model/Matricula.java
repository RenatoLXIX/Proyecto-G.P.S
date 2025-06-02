package com.proyectogps.backendSostenedor.Model;

import java.sql.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
//@Table(name = "matricula")
public class Matricula {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_matricula")
    private Integer idMatricula;
    
    @Column(name = "es_extranjero", nullable = false)
    private Boolean esExtranjero;

    @Column(name = "fecha_matricula", nullable = false)
    private Date fechaMatricula;

    @Column(name = "estado", nullable = false, length=100)
    private String estado;

  //RELACIONES

    @ManyToOne
   @JoinColumn(name = "id_usuario", referencedColumnName = "id_usuario")
   private Usuario usuario;

	public Integer getIdMatricula() {
		return idMatricula;
	}

	public void setIdMatricula(Integer idMatricula) {
		this.idMatricula = idMatricula;
	}

	public Boolean getEsExtranjero() {
		return esExtranjero;
	}

	public void setEsExtranjero(Boolean esExtranjero) {
		this.esExtranjero = esExtranjero;
	}

	public Date getFechaMatricula() {
		return fechaMatricula;
	}

	public void setFechaMatricula(Date fechaMatricula) {
		this.fechaMatricula = fechaMatricula;
	}

	public String getEstado() {
		return estado;
	}

	public void setEstado(String estado) {
		this.estado = estado;
	}

	public Usuario getUsuario() {
		return usuario;
	}

	public void setUsuario(Usuario usuario) {
		this.usuario = usuario;
	}
    
}
