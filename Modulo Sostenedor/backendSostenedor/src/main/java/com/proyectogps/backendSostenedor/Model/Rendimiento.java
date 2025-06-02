package Model;

import java.sql.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
//@Table(name = "rendimiento")
public class Rendimiento {

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_rendimiento")
    private Integer idRendimiento;
    
    @Column(name = "nota", nullable = false)
    private float nota;

    @Column(name = "asignatura", nullable = false, length=100)
    private String asignatura;
    
    @Column(name = "fecha", nullable = false)
    private Date fecha;
    
    @ManyToOne
   @JoinColumn(name = "id_usuario", referencedColumnName = "id_usuario")
   private Usuario usuario;

	public Integer getIdRendimiento() {
		return idRendimiento;
	}

	public void setIdRendimiento(Integer idRendimiento) {
		this.idRendimiento = idRendimiento;
	}

	public float getNota() {
		return nota;
	}

	public void setNota(float nota) {
		this.nota = nota;
	}

	public String getAsignatura() {
		return asignatura;
	}

	public void setAsignatura(String asignatura) {
		this.asignatura = asignatura;
	}

	public Date getFecha() {
		return fecha;
	}

	public void setFecha(Date fecha) {
		this.fecha = fecha;
	}

	public Usuario getUsuario() {
		return usuario;
	}

	public void setUsuario(Usuario usuario) {
		this.usuario = usuario;
	}
	
}
