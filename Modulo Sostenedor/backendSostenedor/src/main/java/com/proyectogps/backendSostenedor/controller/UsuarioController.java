package controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.proyectogps.backendSostenedor.Model.Usuario;
import com.proyectogps.backendSostenedor.service.UsuarioService;

@RestController
@RequestMapping("/usuario")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    @GetMapping("/buscar")
    public ResponseEntity<List<Usuario>> buscarUsuarios(
            @RequestParam(required = false) String nombre,
            @RequestParam(required = false) String tipo) {

    	List<Usuario> usuarios = usuarioService.buscarUsuarios(nombre, tipo);
        return ResponseEntity.ok(usuarios);
    }
}
