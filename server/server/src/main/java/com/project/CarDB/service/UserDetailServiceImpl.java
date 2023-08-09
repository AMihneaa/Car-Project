package com.project.CarDB.service;

import com.project.CarDB.Domain.User.User;
import com.project.CarDB.Domain.User.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.security.core.userdetails.User.UserBuilder;


import java.util.Optional;

@Service
public class UserDetailServiceImpl implements UserDetailsService {

    @Autowired private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String userName) throws UsernameNotFoundException {
        Optional<User> user = userRepository.findByUserName(userName);

        UserBuilder builder = null;

        if (user.isPresent()){
            User currentUser = user.get();

            builder = org.springframework.security.core.userdetails.User.withUsername(userName);
            builder.password(currentUser.getPassword());
            builder.roles(currentUser.getRole());
        }else{
            throw new UsernameNotFoundException("User not found");
        }

        return builder.build();
    }

}
