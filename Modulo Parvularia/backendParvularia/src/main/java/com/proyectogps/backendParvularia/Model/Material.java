package com.proyectogps.backendParvularia.Model;

import java.time.LocalDate;
import java.util.List;

import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonProperty;

@Entity
@Table(name = "material")
public class Material {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_material")
    @JsonProperty("idMaterial")
    private int idMaterial;

    @Column(name = "titulo", nullable = false, length = 200)
    @JsonProperty("titulo")
    private String titulo;

    @Column(name = "tipo", nullable = false, length = 50)
    @JsonProperty("tipo")
    private String tipo;

    @Column(name = "nivel", nullable = false, length = 50)
    @JsonProperty("nivel")
    private String nivel;

    @Column(name = "area", nullable = false, length = 100)
    @JsonProperty("area")
    private String area;

    @Column(name = "nucleo", length = 100)
    @JsonProperty("nucleo")
    private String nucleo;

    @Column(name = "eje", length = 100)
    @JsonProperty("eje")
    private String eje;

    @Column(name = "ambito", length = 100)
    @JsonProperty("ambito")
    private String ambito;

    @Column(name = "objetivo_aprendizaje", length = 500)
    @JsonProperty("objetivoAprendizaje")
    private String objetivoAprendizaje;

    @Column(name = "descripcion", length = 1000)
    @JsonProperty("descripcion")
    private String descripcion;

    @Column(name = "autor", length = 100)
    @JsonProperty("autor")
    private String autor;

    @Column(name = "url_descarga", nullable = false, length = 255)
    @JsonProperty("url_descarga")
    private String urlDescarga;

    @Column(name = "es_online", nullable = false)
    @JsonProperty("esOnline")
    private boolean esOnline;

    @Column(name = "es_descargable", nullable = false)
    @JsonProperty("esDescargable")
    private boolean esDescargable;

    @Column(name = "es_editable", nullable = false)
    @JsonProperty("esEditable")
    private boolean esEditable;

    @Column(name = "incluye_solucionario", nullable = false)
    @JsonProperty("incluyeSolucionario")
    private boolean incluyeSolucionario;

    @Column(name = "fecha_modificacion", nullable = false)
    @JsonProperty("fechaCreacion")
    private LocalDate fechaModificacion;

    // RELACIONES CON OTRAS TABLAS

    @ManyToMany(mappedBy = "materiales")
    private List<Planificacion> planificaciones;

    @ManyToMany
    @JoinTable(
        name = "Material_Categoria",
        joinColumns = @JoinColumn(name = "id_material"),
        inverseJoinColumns = @JoinColumn(name = "id_categoriaOrganizativa")
    )
    private List<CategoriaOrganizativa> categoriaOrganizativa;

    // GETTERS AND SETTERS
    @JsonProperty("idMaterial")
    public int getIdMaterial() {
        return idMaterial;
    }

    public void setIdMaterial(int idMaterial) {
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

    public String getAmbito() {
        return ambito;
    }

    public void setAmbito(String ambito) {
        this.ambito = ambito;
    }

    public String getObjetivoAprendizaje() {
        return objetivoAprendizaje;
    }

    public void setObjetivoAprendizaje(String objetivoAprendizaje) {
        this.objetivoAprendizaje = objetivoAprendizaje;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public String getAutor() {
        return autor;
    }

    public void setAutor(String autor) {
        this.autor = autor;
    }

    @JsonProperty("url_descarga")
    public String getUrlDescarga() {
        return urlDescarga;
    }

    public void setUrlDescarga(String urlDescarga) {
        this.urlDescarga = urlDescarga;
    }

    @JsonProperty("esOnline")
    public boolean isEsOnline() {
        return esOnline;
    }

    public void setEsOnline(boolean esOnline) {
        this.esOnline = esOnline;
    }

    @JsonProperty("esDescargable")
    public boolean isEsDescargable() {
        return esDescargable;
    }

    public void setEsDescargable(boolean esDescargable) {
        this.esDescargable = esDescargable;
    }

    @JsonProperty("esEditable")
    public boolean isEsEditable() {
        return esEditable;
    }

    public void setEsEditable(boolean esEditable) {
        this.esEditable = esEditable;
    }

    @JsonProperty("incluyeSolucionario")
    public boolean isIncluyeSolucionario() {
        return incluyeSolucionario;
    }

    public void setIncluyeSolucionario(boolean incluyeSolucionario) {
        this.incluyeSolucionario = incluyeSolucionario;
    }

    @JsonProperty("fechaCreacion")
    public LocalDate getFechaModificacion() {
        return fechaModificacion;
    }

    public void setFechaModificacion(LocalDate fechaModificacion) {
        this.fechaModificacion = fechaModificacion;
    }

    public List<Planificacion> getPlanificaciones() {
        return planificaciones;
    }

    public void setPlanificaciones(List<Planificacion> planificaciones) {
        this.planificaciones = planificaciones;
    }

    public List<CategoriaOrganizativa> getCategoriaOrganizativa() {
        return categoriaOrganizativa;
    }

    public void setCategoriaOrganizativa(List<CategoriaOrganizativa> categoriaOrganizativa) {
        this.categoriaOrganizativa = categoriaOrganizativa;
    }
}