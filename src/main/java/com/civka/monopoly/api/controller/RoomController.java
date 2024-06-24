package com.civka.monopoly.api.controller;

import com.civka.monopoly.api.entity.Room;
import com.civka.monopoly.api.service.RoomService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.*;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

@Controller
@RequiredArgsConstructor
public class RoomController {

    private final RoomService roomService;
    private final SimpMessagingTemplate messagingTemplate;

    @MessageMapping("/rooms/addRoom")
    @SendTo("/topic/public")
    public Room addRoom(@Payload Room room, @Header("username") String username) {
        return roomService.create(room, username);
    }

    @MessageMapping("/rooms/joinRoom/{roomId}")
    @SendTo({"/topic/public", "/topic/public/{roomId}"})
    public Room joinRoom(@DestinationVariable Long roomId, @Header("username") String username) {
        return roomService.addMember(roomId, username);
    }

    @MessageMapping("/rooms/leaveRoom/{roomId}")
    @SendTo({"/topic/public", "/topic/public/{roomId}"})
    public Object leaveRoom(@DestinationVariable Long roomId, @Header("username") String username) {
        Room updatedRoom = roomService.removeMember(roomId, username);
        return updatedRoom == null ? roomId : updatedRoom;
    }

    @MessageMapping("/rooms/kickMember/{roomId}/{member}")
    @SendTo({"/topic/public", "/topic/public/{roomId}"})
    public Object kickMember(@DestinationVariable Long roomId,
                           @DestinationVariable String member,
                           @Header("username") String username) {
        Room updatedRoom = roomService.kickMember(roomId, member, username);
        messagingTemplate.convertAndSendToUser(member, "/queue/notifications", "You have been kicked from the room");
        return updatedRoom == null ? roomId : updatedRoom;
    }

    @MessageMapping("/rooms/deleteRoom/{roomId}")
    @SendTo("/topic/public")
    public Long deleteRoom(@DestinationVariable Long roomId, @Header("username") String username) {
        roomService.deleteById(roomId, username);
        return roomId;
    }

    @GetMapping("/api/rooms")
    public ResponseEntity<List<Room>> getAllRooms() {
        return ResponseEntity.ok(roomService.findAll());
    }

    @GetMapping("/api/rooms/{roomId}")
    public ResponseEntity<Room> getAllRooms(@PathVariable Long roomId) {
        return ResponseEntity.ok(roomService.findById(roomId));
    }
}
