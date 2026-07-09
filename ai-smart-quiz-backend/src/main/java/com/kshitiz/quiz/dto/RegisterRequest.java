package com.kshitiz.quiz.dto;

import com.kshitiz.quiz.enums.Role;
import lombok.Data;

@Data
public class RegisterRequest {

    private String fullName;
    private String rollNumber;
    private String email;
    private String password;
    private Role role;
}