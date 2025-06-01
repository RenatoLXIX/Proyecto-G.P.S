package com.proyectogps.backendParvularia.Repository;

import com.proyectogps.backendParvularia.Model.CategoriaOrganizativa;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoriaOrganizativaRepository extends JpaRepository<CategoriaOrganizativa, Integer> {

    // Puedes añadir métodos personalizados si lo necesitas, por ejemplo:
    // List<CategoriaOrganizativa> findByNombre(String nombre);
}
