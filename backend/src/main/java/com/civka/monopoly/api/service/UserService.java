package com.civka.monopoly.api.service;

import com.civka.monopoly.api.dto.UserDto;
import com.civka.monopoly.api.entity.User;

public interface UserService {

    User update(User user);

    User findByUsername(String username);

    User findById(Long id);

    User findByUsernameOrEmail(String usernameOrEmail);

    User update(User user, UserDto userDto);

    User updateFields(User user, UserDto userDto);

    void deleteById(Long id);
}
