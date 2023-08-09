package com.project.CarDB.Domain.Owner;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(path = "owners")
public interface OwnerRepository extends CrudRepository<Owner, Long> {
}
