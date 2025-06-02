package Repository;

import com.proyectogps.backendSostenedor.Model.Mensaje;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MensajeRepository extends JpaRepository<Mensaje, Integer> {
    // Puedes agregar métodos personalizados aquí si los necesitas
    
    // Ejemplo: buscar mensajes por remitente
    // List<Mensaje> findByRemitenteId(Integer remitenteId);
}
