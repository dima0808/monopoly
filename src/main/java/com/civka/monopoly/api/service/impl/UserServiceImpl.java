package com.civka.monopoly.api.service.impl;

import com.civka.monopoly.api.dto.UserDto;
import com.civka.monopoly.api.entity.User;
import com.civka.monopoly.api.repository.UserRepository;
import com.civka.monopoly.api.service.UserAlreadyExistException;
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
    public User update(Long id, UserDto userDto) {
        if (userRepository.existsByEmail(userDto.getEmail())) {
            throw new UserAlreadyExistException("User with email " + userDto.getEmail() + " already exists");
        }
        User existingUser = findById(id);
        existingUser.setEmail(userDto.getEmail());
        existingUser.setPassword(userDto.getPassword());
        return userRepository.save(existingUser);
    }

    @Override
    public User updateFields(Long id, UserDto userDto) {
        if (userRepository.existsByEmail(userDto.getEmail())) {
            throw new UserAlreadyExistException("User with email " + userDto.getEmail() + " already exists");
        }
        User existingUser = findById(id);
        if (userDto.getEmail() != null) existingUser.setEmail(userDto.getEmail());
        if (userDto.getPassword() != null) existingUser.setPassword(userDto.getPassword());
        return userRepository.save(existingUser);
    }

    @Override
    public void deleteById(Long id) {
        findById(id);
        userRepository.deleteById(id);
    }
}
