package com.civka.monopoly.api.controller;

import com.civka.monopoly.api.dto.RoomDto;
import com.civka.monopoly.api.entity.Room;
import com.civka.monopoly.api.payload.PasswordMessage;
import com.civka.monopoly.api.payload.RoomMessage;
import com.civka.monopoly.api.service.RoomService;
import com.civka.monopoly.api.service.WrongLobbyPasswordException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.*;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

@Controller
@RequiredArgsConstructor
public class RoomController {

    private final RoomService roomService;

    @MessageMapping("/rooms/addRoom")
    @SendTo("/topic/public")
    public RoomMessage addRoom(@Payload RoomDto roomDto, @Header("username") String username) {
        return RoomMessage.builder()
                .type(RoomMessage.MessageType.CREATE)
                .content("Room " + roomDto.getName() + " created")
                .room(roomService.create(roomDto, username))
                .build();
    }

    @MessageMapping("/rooms/joinRoom/{roomId}")
    @SendTo({"/topic/public", "/topic/public/{roomId}"})
    public RoomMessage joinRoom(@Payload PasswordMessage passwordMessage,
                                @DestinationVariable Long roomId,
                                @Header("username") String username) {
        if (roomService.findById(roomId).getPassword() != null) {
            if (passwordMessage.getPassword() == null) {
                throw new WrongLobbyPasswordException();
            }
            roomService.handlePassword(roomId, passwordMessage.getPassword());
        }
        return RoomMessage.builder()
                .type(RoomMessage.MessageType.JOIN)
                .content("Member " + username + " joined the room with id " + roomId)
                .room(roomService.addMember(roomId, username))
                .build();
    }

    @MessageMapping("/rooms/leaveRoom/{roomId}")
    @SendTo({"/topic/public", "/topic/public/{roomId}"})
    public RoomMessage leaveRoom(@DestinationVariable Long roomId, @Header("username") String username) {
        Room updatedRoom = roomService.removeMember(roomId, username);
        boolean deleteCondition = updatedRoom.getMembers().isEmpty();
        return RoomMessage.builder()
                .type(deleteCondition ? RoomMessage.MessageType.DELETE : RoomMessage.MessageType.LEAVE)
                .content("Member " + username + " left the room with id " + roomId +
                        (deleteCondition ? " and room was deleted" : ""))
                .room(updatedRoom)
                .build();
    }

    @MessageMapping("/rooms/kickMember/{roomId}/{member}")
    @SendTo({"/topic/public", "/topic/public/{roomId}"})
    public RoomMessage kickMember(@DestinationVariable Long roomId,
                           @DestinationVariable String member,
                           @Header("username") String username) {
        return RoomMessage.builder()
                .type(RoomMessage.MessageType.KICK)
                .content(String.format("Member %s was kicked from the room by %s",
                        member, username))
                .room(roomService.kickMember(roomId, member, username))
                .build();
    }

    @MessageMapping("/rooms/deleteRoom/{roomId}")
    @SendTo("/topic/public")
    public RoomMessage deleteRoom(@DestinationVariable Long roomId, @Header("username") String username) {
        return RoomMessage.builder()
                .type(RoomMessage.MessageType.DELETE)
                .content(String.format("Room with id %d deleted by %s and all members were kicked out",
                        roomId, username))
                .room(roomService.deleteById(roomId, username))
                .build();
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
