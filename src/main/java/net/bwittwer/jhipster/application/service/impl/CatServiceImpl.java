package net.bwittwer.jhipster.application.service.impl;

import net.bwittwer.jhipster.application.service.CatService;
import net.bwittwer.jhipster.application.domain.Cat;
import net.bwittwer.jhipster.application.repository.CatRepository;
import net.bwittwer.jhipster.application.service.dto.CatDTO;
import net.bwittwer.jhipster.application.service.mapper.CatMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing Cat.
 */
@Service
@Transactional
public class CatServiceImpl implements CatService {

    private final Logger log = LoggerFactory.getLogger(CatServiceImpl.class);

    private final CatRepository catRepository;

    private final CatMapper catMapper;

    public CatServiceImpl(CatRepository catRepository, CatMapper catMapper) {
        this.catRepository = catRepository;
        this.catMapper = catMapper;
    }

    /**
     * Save a cat.
     *
     * @param catDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public CatDTO save(CatDTO catDTO) {
        log.debug("Request to save Cat : {}", catDTO);
        Cat cat = catMapper.toEntity(catDTO);
        cat = catRepository.save(cat);
        return catMapper.toDto(cat);
    }

    /**
     * Get all the cats.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<CatDTO> findAll() {
        log.debug("Request to get all Cats");
        return catRepository.findAll().stream()
            .map(catMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get one cat by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public CatDTO findOne(Long id) {
        log.debug("Request to get Cat : {}", id);
        Cat cat = catRepository.findOne(id);
        return catMapper.toDto(cat);
    }

    /**
     * Delete the cat by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Cat : {}", id);
        catRepository.delete(id);
    }
}
