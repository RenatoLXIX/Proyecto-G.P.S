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
//@Table(name = "mensaje")
public class Mensaje {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_mensaje")
    private Integer idMensaje;

    @Column(name = "asunto", nullable = false, length = 200)
    private String asunto;

    @Column(name = "contenido", nullable = false, length = 255)
    private String contenido;

    @Column(name = "fecha_envio", nullable = false)
    private Date fecha_envio;

    @Column(name = "remitente_id", nullable = false)
    private int remitente_id;


    //RELACIONES

     @ManyToOne
    @JoinColumn(name = "id_usuario", referencedColumnName = "id_usuario")
    private Usuario usuario;



    // GETTERS AND SETTERS
     public Integer getIdMensaje() {
         return idMensaje;
     }


     public void setIdMensaje(Integer idMensaje) {
         this.idMensaje = idMensaje;
     }


     public String getAsunto() {
         return asunto;
     }


     public void setAsunto(String asunto) {
         this.asunto = asunto;
     }


     public String getContenido() {
         return contenido;
     }


     public void setContenido(String contenido) {
         this.contenido = contenido;
     }


     public Date getFecha_envio() {
         return fecha_envio;
     }


     public void setFecha_envio(Date fecha_envio) {
         this.fecha_envio = fecha_envio;
     }


     public int getRemitente_id() {
         return remitente_id;
     }


     public void setRemitente_id(int remitente_id) {
         this.remitente_id = remitente_id;
     }


     public Usuario getUsuario() {
         return usuario;
     }


     public void setUsuario(Usuario usuario) {
         this.usuario = usuario;
     }




    

    
}