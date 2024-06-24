package com.civka.monopoly.api.service;

public class UserNotFoundException extends RuntimeException {

    public UserNotFoundException(String login) {
        super(String.format("User with login '%s' not found", login));
    }
}
