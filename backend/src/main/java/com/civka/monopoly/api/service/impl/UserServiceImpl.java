package com.civka.monopoly.api.service.impl;

import com.civka.monopoly.api.dto.UserDto;
import com.civka.monopoly.api.entity.User;
import com.civka.monopoly.api.repository.UserRepository;
import com.civka.monopoly.api.service.UserAlreadyExistException;
import com.civka.monopoly.api.service.UserNotAllowedException;
import com.civka.monopoly.api.service.UserNotFoundException;
import com.civka.monopoly.api.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    @Override
    public User update(User user) {
        return userRepository.save(user);
    }

    @Override
    public User findByUsername(String username) {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new UserNotFoundException(username));
    }

    @Override
    public User findById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException(id));
    }

    @Override
    public User findByUsernameOrEmail(String usernameOrEmail) {
        return userRepository.findByUsernameOrEmail(usernameOrEmail, usernameOrEmail)
                .orElseThrow(() -> new UserNotFoundException(usernameOrEmail));
    }

    @Override
    public User update(User user, UserDto userDto) {
        if (!userDto.getUsername().equals(user.getUsername())) {
            throw new UserNotAllowedException();
        }
        if (userRepository.existsByEmail(userDto.getEmail())) {
            throw new UserAlreadyExistException("User with email " + userDto.getEmail() + " already exists");
        }
        user.setEmail(userDto.getEmail());
        user.setPassword(userDto.getPassword());
        return userRepository.save(user);
    }

    @Override
    public User updateFields(User user, UserDto userDto) {
        if (!userDto.getUsername().equals(user.getUsername())) {
            throw new UserNotAllowedException();
        }
        if (userDto.getEmail() != null && userRepository.existsByEmail(userDto.getEmail())) {
            throw new UserAlreadyExistException("User with email " + userDto.getEmail() + " already exists");
        }
        if (userDto.getEmail() != null) user.setEmail(userDto.getEmail());
        if (userDto.getPassword() != null) user.setPassword(userDto.getPassword());
        return userRepository.save(user);
    }

    @Override
    public void deleteById(Long id) {
        findById(id);
        userRepository.deleteById(id);
    }
}
