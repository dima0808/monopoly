package com.civka.monopoly.api.controller;

import com.civka.monopoly.api.entity.Room;
import com.civka.monopoly.api.service.RoomService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.*;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

@Controller
@RequiredArgsConstructor
public class RoomController {

    private final RoomService roomService;

    @MessageMapping("/rooms/addRoom")
    @SendTo("/topic/public")
    public Room addRoom(@Payload Room room, @Header("username") String username) {
        return roomService.create(room, username);
    }

    @MessageMapping("/rooms/joinRoom/{roomId}")
    @SendTo("/topic/public")
    public Room joinRoom(@DestinationVariable Long roomId, @Header("username") String username) {
        return roomService.addMember(roomId, username);
    }

    @MessageMapping("/rooms/deleteRoom/{roomId}")
    @SendTo("/topic/public")
    public Long deleteRoom(@DestinationVariable Long roomId) {
        roomService.deleteById(roomId);
        return roomId;
    }

    @GetMapping("/api/rooms")
    public ResponseEntity<List<Room>> getAllRooms() {
        return ResponseEntity.ok(roomService.findAll());
    }
}
