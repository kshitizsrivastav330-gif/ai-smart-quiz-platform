package com.kshitiz.quiz.controller;

import com.kshitiz.quiz.dto.AuthResponse;
import com.kshitiz.quiz.dto.LoginRequest;
import com.kshitiz.quiz.dto.RegisterRequest;
import com.kshitiz.quiz.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public String register(@RequestBody RegisterRequest request) {
        return userService.register(request);
    }

    @PostMapping("/login")
    public AuthResponse login(@RequestBody LoginRequest request) {
        return userService.login(request);
    }
}