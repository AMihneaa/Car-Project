package com.project.CarDB.service;

import com.project.CarDB.Domain.User.User;
import com.project.CarDB.Domain.User.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    UserRepository userRepository;


    public User createUser(String username, String password) {
        String hashedPassword = BCrypt.hashpw(password, BCrypt.gensalt());
        User user = new User();
        user.setUserName(username);
        user.setPassword(hashedPassword);
        user.setRole("USER");
        return userRepository.save(user);
    }

 }
