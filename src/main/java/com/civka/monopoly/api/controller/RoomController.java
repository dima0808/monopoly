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
    public Room addRoom(@Payload Room room) {
        return roomService.createRoom(room);
    }

    @MessageMapping("/rooms/deleteRoom/{roomId}")
    @SendTo("/topic/public")
    public Long deleteRoom(@DestinationVariable Long roomId) {
        roomService.deleteRoom(roomId);
        return roomId;
    }

    @GetMapping("/api/rooms")
    public ResponseEntity<List<Room>> getAllRooms() {
        return ResponseEntity.ok(roomService.findAllRooms());
    }
}
