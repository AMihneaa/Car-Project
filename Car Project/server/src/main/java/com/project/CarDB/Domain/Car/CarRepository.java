package com.project.CarDB.Domain.Car;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(path = "cars")
public interface CarRepository extends CrudRepository<Car, Long> {
}
