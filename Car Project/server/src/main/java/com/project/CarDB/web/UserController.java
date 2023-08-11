package com.project.CarDB.web;

import com.project.CarDB.Domain.User.User;
import com.project.CarDB.Domain.User.UserRepository;
import com.project.CarDB.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api")
public class UserController {

    @Autowired
    UserService userService;

    @Autowired
    UserRepository userRepository;

    @Autowired
    AuthenticationManager authenticationManager;

    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody Map<String, String> request) {
        String username = request.get("username");
        String password = request.get("password");

        if (username == null || password == null) {
            return ResponseEntity.badRequest().body("Username and password are required.");
        }

        User existingUser = userRepository.findByUserName(username).orElse(null);
        if (existingUser != null) {
            return ResponseEntity.badRequest().body("Username already exists.");
        }

        userService.createUser(username, password);
        return ResponseEntity.ok("User registered successfully.");
    }

}
