package com.civka.monopoly.api.controller;

import com.civka.monopoly.api.dto.SignInDto;
import com.civka.monopoly.api.dto.SignUpDto;
import com.civka.monopoly.api.entity.User;
import com.civka.monopoly.api.payload.JwtResponse;
import com.civka.monopoly.api.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/signin")
    public ResponseEntity<?> signIn(@RequestBody SignInDto signInDto) {
        String jwt = authService.signIn(signInDto);
        return ResponseEntity.ok(new JwtResponse(jwt));
    }

    @PostMapping("/signup")
    public ResponseEntity<User> getRegisterPage(@RequestBody SignUpDto signUpDto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(authService.signUp(signUpDto));
    }
}
