package Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.proyectogps.backendSostenedor.Model.Matricula;

@Repository
public interface MatriculaRepository extends JpaRepository<Matricula, Integer> {

}
