package Repository;

import com.proyectogps.backendSostenedor.Model.Establecimiento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EstablecimientoRepository extends JpaRepository<Establecimiento, Integer> {

    // Ejemplo de método personalizado:
    // List<Establecimiento> findByComuna(String comuna);
}
