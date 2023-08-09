package com.project.CarDB.web;

import com.project.CarDB.service.JwtService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Collections;

@Component
public class AuthenticationFilter extends OncePerRequestFilter {

    @Autowired private JwtService jwtService;


    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String jtw = request.getHeader(HttpHeaders.AUTHORIZATION);

        if (jtw != null){

            //VERIFY AND GET USE TOKEN
            String user = jwtService.getAuthUser(request);

            // Authenticate
            Authentication authentication = new UsernamePasswordAuthenticationToken(user, null, Collections.emptyList());

            SecurityContextHolder.getContext().setAuthentication(authentication);
        }

        filterChain.doFilter(request, response);
    }
}