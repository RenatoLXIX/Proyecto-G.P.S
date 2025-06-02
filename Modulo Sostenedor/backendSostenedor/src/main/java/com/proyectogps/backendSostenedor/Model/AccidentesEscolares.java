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
//@Table(name = "accidentes_escolares")
public class AccidentesEscolares {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_accidentes_escolares")
    private Integer idAccidentesEscolares;

    @Column(name = "nombre_alumno", nullable = false, length = 100)
    private String nombre_alumno;

    @Column(name = "edad", nullable = false, length = 100)
    private int edad;

    @Column(name = "fecha", nullable = false)
    private Date fecha;

    @Column(name = "curso", nullable = false, length = 200)
    private String curso;

    @Column(name = "nacionalidad", nullable = false, length = 100)
    private String nacionalidad;

    @Column(name = "descripcion", nullable = false, length = 255)
    private String descripcion;

    @Column(name = "id_usuario", nullable = false)
    private Integer id_usuario;

    @Column(name = "id_establecimiento", nullable = false)
    private Integer id_establecimiento;


    @ManyToOne
    @JoinColumn(name = "id_establecimiento", referencedColumnName = "id_establecimiento")
    private Establecimiento establecimiento;

    
}
