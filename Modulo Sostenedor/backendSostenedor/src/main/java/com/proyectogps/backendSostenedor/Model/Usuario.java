package Model;

import java.sql.Date;
import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;

@Entity
//@Table(name = "usuario")
public class Usuario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    @Column(name = "id_usuario")
    private Integer idUsuario;
    
    @Column(name = "rut", nullable = false, length = 12)
    private String rut;

    @Column(name = "nombre", nullable = false, length = 100)
    private String nombre;

    @Column(name = "email", nullable = false, length = 100)
    private String email;

    @Column(name = "telefono", nullable = false, length = 20)
    private String telefono;

    @Column(name = "tipo", nullable = false, length = 50)
    private String tipo;
    //RELACIONES

    @OneToMany(mappedBy = "usuario")
    private List<Mensaje> mensaje;

    @ManyToOne
    @JoinColumn(name = "id_establecimiento", referencedColumnName = "id_establecimiento")
    private Establecimiento establecimiento;



    // GETTERS AND SETTERS
    
    public Integer getIdUsuario() {
 		return idUsuario;
 	}

 	public void setIdUsuario(Integer idUsuario) {
 		this.idUsuario = idUsuario;
 	}

    public String getRut() {
        return rut;
    }

	public void setRut(String rut) {
        this.rut = rut;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getTelefono() {
        return telefono;
    }

    public void setTelefono(String telefono) {
        this.telefono = telefono;
    }

    public String getTipo() {
        return tipo;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }


    public List<Mensaje> getMensaje() {
        return mensaje;
    }

    public void setMensaje(List<Mensaje> mensaje) {
        this.mensaje = mensaje;
    }

    public Establecimiento getEstablecimiento() {
        return establecimiento;
    }

    public void setEstablecimiento(Establecimiento establecimiento) {
        this.establecimiento = establecimiento;
    }



    
}
