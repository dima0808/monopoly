package com.civka.monopoly.api.service;

public class UserNotFoundException extends RuntimeException {

    public UserNotFoundException(String username) {
        super(String.format("User with login '%s' not found", username));
    }
}
