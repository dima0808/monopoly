package com.civka.monopoly.api.service;

import com.civka.monopoly.api.entity.User;

public interface UserService {

    User findByUsername(String username);
}
