package com.proyectogps.backendParvularia.Model;



import jakarta.persistence.*;
import java.util.Date;
import java.util.List;

@Entity
//@Table(name = "material")
public class Material {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_material")
    private Integer idMaterial;

    @Column(name = "titulo", nullable = false, length = 200)
    private String titulo;

    @Column(name = "tipo", nullable = false, length = 50)
    private String tipo;

    @Column(name = "nivel", nullable = false, length = 50)
    private String nivel;

    @Column(name = "area", nullable = false, length = 50)
    private String area;

    @Column(name = "url_descarga", nullable = false, length = 255)
    private String url;

    @Column(name = "fecha_modificacion", nullable = false)
    private Date fechaModificacion;

    //Conexciones con otras tablas

    @OneToMany(mappedBy = "material")
       private List<Planificacion> planificacion;

    //@OneToMany(mappedBy = "material")
    //  private List<MaterialCategoria> material_categoria;


    //si no se utiliz MaterialCategoria, utilizar esta relacion
    @ManyToMany
    @JoinTable(
        name = "Material_Categoria",
        joinColumns = @JoinColumn(name = "id_material"),
        inverseJoinColumns = @JoinColumn(name = "id_categoria")
    )
    private List<CategoriaOrganizativa> categorias;



     //Getters and Setters

    public Integer getIdMaterial() {
        return idMaterial;
    }

    public void setIdMaterial(Integer idMaterial) {
        this.idMaterial = idMaterial;
    }

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
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

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public Date getFechaModificacion() {
        return fechaModificacion;
    }

    public void setFechaModificacion(Date fechaModificacion) {
        this.fechaModificacion = fechaModificacion;
    }


    

}