package net.bwittwer.jhipster.application.service.mapper;

import net.bwittwer.jhipster.application.domain.*;
import net.bwittwer.jhipster.application.service.dto.CatDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Cat and its DTO CatDTO.
 */
@Mapper(componentModel = "spring", uses = {LocationMapper.class})
public interface CatMapper extends EntityMapper<CatDTO, Cat> {

    @Mapping(source = "cat.id", target = "catId")
    CatDTO toDto(Cat cat);

    @Mapping(source = "catId", target = "cat")
    Cat toEntity(CatDTO catDTO);

    default Cat fromId(Long id) {
        if (id == null) {
            return null;
        }
        Cat cat = new Cat();
        cat.setId(id);
        return cat;
    }
}
