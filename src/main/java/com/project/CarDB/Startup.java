package com.project.CarDB;

import com.project.CarDB.Car.Car;
import com.project.CarDB.Car.CarRepository;
import com.project.CarDB.Owner.Owner;
import com.project.CarDB.Owner.OwnerRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;


import java.util.Arrays;

@Configuration
public class Startup {

    private static Logger logger = LoggerFactory.getLogger(CarDbApplication.class);

    @Autowired OwnerRepository ownerRepository;

    @Bean
    CommandLineRunner initDatabase(CarRepository carRepository){
        return args -> {

            Owner owner1 = new Owner("Mihnea", "M");
            Owner owner2 = new Owner("Stefan",  "S");

            ownerRepository.saveAll(Arrays.asList(owner1, owner2));

            Car car1 = new Car("Ford", "Mustang", "Red", "ADF-1121", 2021, 59000, owner1);
            Car car2 = new Car("Nissan", "Leaf", "White", "SSJ-3002", 2019, 29000, owner1);
            Car car3 = new Car("Toyota","Prius","Silver", "KKO-0212", 2020, 39000, owner2);

            carRepository.saveAll(Arrays.asList(car1, car2, car3));

            for (Car car : carRepository.findAll()){
                logger.info(car.getBrand() + " " + car.getModel());
            }
        };
    }

}
