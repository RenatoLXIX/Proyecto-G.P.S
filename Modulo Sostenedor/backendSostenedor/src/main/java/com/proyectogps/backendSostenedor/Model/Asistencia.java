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
//@Table(name = "asistencia")
public class Asistencia {

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_asistencia")
    private Integer idAsistencia;
    
    @Column(name = "fecha", nullable = false)
    private Date fecha;

    @Column(name = "estado", nullable = false)
    private Boolean estado;
    
    @ManyToOne
   @JoinColumn(name = "id_usuario", referencedColumnName = "id_usuario")
   private Usuario usuario;

	public Integer getIdAsistencia() {
		return idAsistencia;
	}

	public void setIdAsistencia(Integer idAsistencia) {
		this.idAsistencia = idAsistencia;
	}

	public Date getFecha() {
		return fecha;
	}

	public void setFecha(Date fecha) {
		this.fecha = fecha;
	}

	public Boolean getEstado() {
		return estado;
	}

	public void setEstado(Boolean estado) {
		this.estado = estado;
	}

	public Usuario getUsuario() {
		return usuario;
	}

	public void setUsuario(Usuario usuario) {
		this.usuario = usuario;
	}
    
	
}
