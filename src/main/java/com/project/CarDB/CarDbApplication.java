package com.project.CarDB;

import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@SpringBootApplication
public class CarDbApplication {
	private static Logger logger = LoggerFactory.getLogger(CarDbApplication.class);
	public static void main(String[] args) {
		SpringApplication.run(CarDbApplication.class, args);
	}

}
