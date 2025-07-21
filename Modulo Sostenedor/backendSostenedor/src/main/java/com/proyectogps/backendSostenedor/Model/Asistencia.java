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
    @Column(name = "id_Asistencia")
    private Integer idAsistencia;

    @Column(name = "nombre_alumno", nullable = false, length = 100)
    private String nombre_alumno;


    @Column(name = "tipo", nullable = false, length = 100)
    private String tipo;

    @Column(name = "fecha_ingreso", nullable = false)
    private Date fecha_ingreso;

    @Column(name = "curso", nullable = false, length = 200)
    private String curso;

    @Column(name = "id_usuario", nullable = false)
    private Integer id_usuario;

    @Column(name = "id_establecimiento", nullable = false)
    private Integer id_establecimiento;


    //RELACIONES

    @ManyToOne
    @JoinColumn(name = "id_establecimiento", referencedColumnName = "id_establecimiento")
    private Establecimiento establecimiento;
    
    @ManyToOne
    @JoinColumn(name = "id_usuario", referencedColumnName = "id_usuario")
    private Usuario usuario;

}