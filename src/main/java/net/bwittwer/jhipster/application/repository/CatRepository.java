package net.bwittwer.jhipster.application.repository;

import net.bwittwer.jhipster.application.domain.Cat;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Cat entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CatRepository extends JpaRepository<Cat, Long> {

}
