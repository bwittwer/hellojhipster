package net.bwittwer.jhipster.application.service.mapper;

import net.bwittwer.jhipster.application.domain.*;
import net.bwittwer.jhipster.application.service.dto.LocationDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Location and its DTO LocationDTO.
 */
@Mapper(componentModel = "spring", uses = {CountryMapper.class, DepartmentMapper.class})
public interface LocationMapper extends EntityMapper<LocationDTO, Location> {

    @Mapping(source = "country.id", target = "countryId")
    @Mapping(source = "department.id", target = "departmentId")
    LocationDTO toDto(Location location);

    @Mapping(source = "countryId", target = "country")
    @Mapping(source = "departmentId", target = "department")
    Location toEntity(LocationDTO locationDTO);

    default Location fromId(Long id) {
        if (id == null) {
            return null;
        }
        Location location = new Location();
        location.setId(id);
        return location;
    }
}
