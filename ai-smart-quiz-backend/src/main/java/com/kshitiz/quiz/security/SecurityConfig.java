package com.kshitiz.quiz.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
public class SecurityConfig {

    private final JwtFilter jwtFilter;

    public SecurityConfig(JwtFilter jwtFilter) {
        this.jwtFilter = jwtFilter;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        http

                // Enable CORS
                .cors(Customizer.withDefaults())

                // Disable CSRF
                .csrf(csrf -> csrf.disable())

                // Stateless Session
                .sessionManagement(session ->
                        session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))

                // Authorization
                .authorizeHttpRequests(auth -> auth

                        .requestMatchers("/api/auth/**").permitAll()

                        .requestMatchers("/api/ai/**").permitAll()

                        .requestMatchers("/api/categories/**").permitAll()
                        .requestMatchers("/api/questions/**").permitAll()
                        .requestMatchers("/api/quizzes/**").permitAll()

                        .requestMatchers("/api/dashboard/**").hasRole("ADMIN")

                        .requestMatchers("/api/attempts/**").hasRole("STUDENT")

                        .anyRequest().authenticated()
                )

                // JWT Filter
                .addFilterBefore(jwtFilter,
                        UsernamePasswordAuthenticationFilter.class)

                .httpBasic(Customizer.withDefaults());

        return http.build();
    }
}