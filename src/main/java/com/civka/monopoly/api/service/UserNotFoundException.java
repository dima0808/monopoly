package com.civka.monopoly.api.service;

public class UserNotFoundException extends RuntimeException {

    public UserNotFoundException(String login) {
        super(String.format("User with login '%s' not found", login));
    }

    public UserNotFoundException(Long id) {
        super(String.format("User with id %s not found", id));
    }
}
