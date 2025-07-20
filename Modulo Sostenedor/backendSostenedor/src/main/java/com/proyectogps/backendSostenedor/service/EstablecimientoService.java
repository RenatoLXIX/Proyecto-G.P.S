package com.proyectogps.backendSostenedor.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.proyectogps.backendSostenedor.DTO.InformeComunalDTO;
import com.proyectogps.backendSostenedor.DTO.InformeGeneralDTO;
import com.proyectogps.backendSostenedor.Model.Asistencia;
import com.proyectogps.backendSostenedor.Model.Establecimiento;
import com.proyectogps.backendSostenedor.Model.Matricula;
import com.proyectogps.backendSostenedor.Model.Rendimiento;
import com.proyectogps.backendSostenedor.Model.Usuario;
import com.proyectogps.backendSostenedor.Repository.AsistenciaRepository;
import com.proyectogps.backendSostenedor.Repository.EstablecimientoRepository;
import com.proyectogps.backendSostenedor.Repository.MatriculaRepository;
import com.proyectogps.backendSostenedor.Repository.RendimientoRepository;
import com.proyectogps.backendSostenedor.Repository.UsuarioRepository;

@Service
public class EstablecimientoService {

    @Autowired
    private EstablecimientoRepository establecimientoRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private AsistenciaRepository asistenciaRepository;

    @Autowired
    private RendimientoRepository rendimientoRepository;

    @Autowired
    private MatriculaRepository matriculaRepository;


    public InformeGeneralDTO generarInformeGeneral(Integer idEstablecimiento) {
        Optional<Establecimiento> optionalEstablecimiento = establecimientoRepository.findById(idEstablecimiento);
        if (optionalEstablecimiento.isEmpty()) {
            throw new RuntimeException("Establecimiento no encontrado");
        }

        Establecimiento establecimiento = optionalEstablecimiento.get();
        List<Usuario> usuarios = usuarioRepository.findByEstablecimientoIdEstablecimiento(idEstablecimiento);

        if (usuarios.isEmpty()) {
            return new InformeGeneralDTO(
                establecimiento.getNombre(), 0.0, 0.0, 0.0
            );
        }

        List<Integer> idsUsuarios = usuarios.stream()
                                            .map(Usuario::getIdUsuario)
                                            .toList();

        // Obtener todas las asistencias y rendimientos
        List<Asistencia> asistencias = asistenciaRepository.findByUsuarioIdUsuarioIn(idsUsuarios);
        List<Rendimiento> rendimientos = rendimientoRepository.findByUsuarioIdUsuarioIn(idsUsuarios);

        // Calcular porcentaje asistencia
        long totalAsistencias = asistencias.size();
        long asistenciasTrue = asistencias.stream().filter(Asistencia::getEstado).count();

        double porcentajeAsistencia = totalAsistencias > 0 ? (asistenciasTrue * 100.0) / totalAsistencias : 0.0;
        double porcentajeInasistencia = 100.0 - porcentajeAsistencia;

        // Calcular promedio de notas
        double promedioNotas = rendimientos.stream()
                                           .mapToDouble(Rendimiento::getNota)
                                           .average()
                                           .orElse(0.0);

        return new InformeGeneralDTO(
            establecimiento.getNombre(),
            porcentajeAsistencia,
            porcentajeInasistencia,
            promedioNotas
        );


    }

    public InformeComunalDTO generarInformeComunal(Integer idEstablecimiento) {
    Optional<Establecimiento> optionalEstablecimiento = establecimientoRepository.findById(idEstablecimiento);
    if (optionalEstablecimiento.isEmpty()) {
        throw new RuntimeException("Establecimiento no encontrado");
    }

    Establecimiento establecimiento = optionalEstablecimiento.get();

    // Obtener usuarios asociados al establecimiento
    List<Usuario> usuarios = usuarioRepository.findByEstablecimientoIdEstablecimiento(idEstablecimiento);
    if (usuarios.isEmpty()) {
        return new InformeComunalDTO(establecimiento.getNombre(), 0, 0, 0, 0);
    }

    List<Integer> idsUsuarios = usuarios.stream()
                                        .map(Usuario::getIdUsuario)
                                        .toList();

    // Obtener matrículas asociadas a los usuarios
    List<Matricula> matriculas = matriculaRepository.findAllByUsuarioIdUsuarioIn(idsUsuarios);

    long totalMatriculados = matriculas.size();
    long cantidadExtranjeros = matriculas.stream().filter(Matricula::getEsExtranjero).count();
    long cantidadRetirados = matriculas.stream()
                                      .filter(m -> m.getEstado().equalsIgnoreCase("retirado"))
                                      .count();

    long cantidadRepitencias = matriculas.stream()
            .collect(Collectors.groupingBy(m -> m.getUsuario().getIdUsuario(), Collectors.counting()))
            .values()
            .stream()
            .filter(count -> count > 1)
            .count();






    return new InformeComunalDTO(
        establecimiento.getNombre(),
        totalMatriculados,
        cantidadExtranjeros,
        cantidadRetirados,
        cantidadRepitencias
    );
}





}