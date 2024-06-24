package com.civka.monopoly.api.service;

import com.civka.monopoly.api.entity.User;

public interface UserService {

    User update(User user);

    User findByUsername(String username);

    User findByUsernameOrEmail(String usernameOrEmail);
}
