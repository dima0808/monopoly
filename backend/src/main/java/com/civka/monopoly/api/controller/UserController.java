package com.civka.monopoly.api.controller;

import com.civka.monopoly.api.dto.UserDto;
import com.civka.monopoly.api.entity.Room;
import com.civka.monopoly.api.entity.User;
import com.civka.monopoly.api.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping
    public ResponseEntity<User> getUser() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        return ResponseEntity.ok(userService.findByUsername(username));
    }

    @GetMapping("/username")
    public ResponseEntity<String> getUsername() {
        return ResponseEntity.ok(SecurityContextHolder.getContext().getAuthentication().getName());
    }

    @GetMapping("/room")
    public ResponseEntity<Room> getUserRoom() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userService.findByUsername(username);
        return ResponseEntity.ok(user.getMember().getRoom());
    }

    @PutMapping
    public ResponseEntity<User> updateUser(UserDto userDto) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userService.findByUsername(username);
        return ResponseEntity.ok(userService.update(user.getId(), userDto));
    }

    @PatchMapping
    public ResponseEntity<User> updateUserFields(UserDto userDto) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userService.findByUsername(username);
        return ResponseEntity.ok(userService.updateFields(user.getId(), userDto));
    }

    @DeleteMapping
    public ResponseEntity<Void> deleteUser() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userService.findByUsername(username);
        userService.deleteById(user.getId());
        return ResponseEntity.noContent().build();
    }
}