package com.civka.monopoly.api.controller;

import com.civka.monopoly.api.dto.ChatMessageDto;
import com.civka.monopoly.api.dto.ContactDto;
import com.civka.monopoly.api.dto.UserDto;
import com.civka.monopoly.api.entity.Chat;
import com.civka.monopoly.api.entity.ChatMessage;
import com.civka.monopoly.api.entity.Room;
import com.civka.monopoly.api.entity.User;
import com.civka.monopoly.api.service.ChatService;
import com.civka.monopoly.api.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
    private final ChatService chatService;

    @GetMapping
    public ResponseEntity<User> getUser() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        return ResponseEntity.ok(userService.findByUsername(username));
    }

    @GetMapping("/username")
    public ResponseEntity<String> getUsername() {
        return ResponseEntity.ok(SecurityContextHolder.getContext().getAuthentication().getName());
    }

    @GetMapping("/{username}/contacts")
    public ResponseEntity<List<ContactDto>> getUserContacts(@PathVariable String username) {
        return ResponseEntity.ok(chatService.getUserContacts(username));
    }

    @GetMapping("/room")
    public ResponseEntity<Room> getUserRoom() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userService.findByUsername(username);
        return ResponseEntity.ok(user.getMember().getRoom());
    }

    @PutMapping
    public ResponseEntity<User> updateUser(@RequestBody UserDto userDto) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userService.findByUsername(username);
        return ResponseEntity.ok(userService.update(user, userDto));
    }

    @PatchMapping
    public ResponseEntity<User> updateUserFields(@RequestBody UserDto userDto) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userService.findByUsername(username);
        return ResponseEntity.ok(userService.updateFields(user, userDto));
    }

    @DeleteMapping
    public ResponseEntity<Void> deleteUser() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userService.findByUsername(username);
        userService.deleteById(user.getId());
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{nickname}")
    public ResponseEntity<User> getUserByNickname(@PathVariable String nickname) {
        return ResponseEntity.ok(userService.findByNickname(nickname));
    }
}
