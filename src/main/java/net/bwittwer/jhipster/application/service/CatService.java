package net.bwittwer.jhipster.application.service;

import net.bwittwer.jhipster.application.service.dto.CatDTO;
import java.util.List;

/**
 * Service Interface for managing Cat.
 */
public interface CatService {

    /**
     * Save a cat.
     *
     * @param catDTO the entity to save
     * @return the persisted entity
     */
    CatDTO save(CatDTO catDTO);

    /**
     * Get all the cats.
     *
     * @return the list of entities
     */
    List<CatDTO> findAll();

    /**
     * Get the "id" cat.
     *
     * @param id the id of the entity
     * @return the entity
     */
    CatDTO findOne(Long id);

    /**
     * Delete the "id" cat.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
