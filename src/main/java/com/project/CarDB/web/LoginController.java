package com.project.CarDB.web;

import com.project.CarDB.Domain.Account.AccountCredentials;
import com.project.CarDB.service.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
public class LoginController {

    @Autowired
    JwtService jwtService;

    @Autowired AuthenticationManager authenticationManager;

    @RequestMapping(value ="/login", method = RequestMethod.POST)
    public ResponseEntity<?> getToken (@RequestBody AccountCredentials accountCredentials){
        UsernamePasswordAuthenticationToken credentials = new UsernamePasswordAuthenticationToken(accountCredentials.getUsername(), accountCredentials.getPassword());

        Authentication authentication = authenticationManager.authenticate(credentials);

        // GENERATE TOKENS
        String jwts = jwtService.getToken(authentication.getName());

        //BUILD RESPONSE WITH THE GENERATED TOKEN
        return ResponseEntity.ok()
                .header(HttpHeaders.AUTHORIZATION, "BEARER " + jwts)
                .header(HttpHeaders.ACCESS_CONTROL_EXPOSE_HEADERS, "Authorization")
                .build();
    }

    @RequestMapping(value = "/", method = RequestMethod.GET)
    public String index(){
        return "ceva";
    }
}
