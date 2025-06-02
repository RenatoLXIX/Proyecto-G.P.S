package Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.proyectogps.backendSostenedor.Model.Rendimiento;

@Repository
public interface RendimientoRepository extends JpaRepository<Rendimiento, Integer> {

	List<Rendimiento> findByUsuarioIdUsuarioIn(List<Integer> ids);

	
}
