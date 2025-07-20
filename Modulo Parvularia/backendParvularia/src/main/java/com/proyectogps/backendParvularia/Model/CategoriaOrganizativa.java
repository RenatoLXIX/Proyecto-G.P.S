package com.proyectogps.backendParvularia.Model;


import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;


@Entity
@Table(name = "categoria_organizativa")
public class CategoriaOrganizativa {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_categoriaOrganizativa")
    private Integer idCategoria;
    
    @Column(name = "nombre", nullable = false, length = 100)
    private String nombre;
    
    @Column(name = "description", nullable = false, length = 255 )
    private String descripcion;

    @Column(name = "nucleo", nullable = false, length = 255 )
    private String nucleo;

    @Column(name = "eje", nullable = false, length = 255 )
    private String eje;

    @Column(name = "ambito", nullable = false, length = 255 )
    private String ambito;
    


//Relaciones

    //abajo hay otro error pero comentado
  
    //utilizar relacion si se desecha clase MaterialCategoria
     @ManyToMany(mappedBy = "categoriaOrganizativa")
    private List<Material> material;




    //getters y setters


     public Integer getIdCategoria() {
         return idCategoria;
     }



     public void setIdCategoria(Integer idCategoria) {
         this.idCategoria = idCategoria;
     }



     public String getNombre() {
         return nombre;
     }



     public void setNombre(String nombre) {
         this.nombre = nombre;
     }



     public String getDescripcion() {
         return descripcion;
     }



     public void setDescripcion(String descripcion) {
         this.descripcion = descripcion;
     }



     public List<Material> getMateriales() {
         return material;
     }



     public void setMateriales(List<Material> materiales) {
         this.material = materiales;
     }



    
    
    // public List<MaterialCategoria> getMaterialCategoria() {
    //     return materialCategoria;
    // }

    // public void setMaterialCategoria(List<MaterialCategoria> materialCategoria) {
    //     this.materialCategoria = materialCategoria;
    // }

    
}
