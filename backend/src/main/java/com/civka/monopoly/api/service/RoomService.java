package com.civka.monopoly.api.service;

import com.civka.monopoly.api.dto.RoomDto;
import com.civka.monopoly.api.entity.Room;

import java.util.List;

public interface RoomService {

    Room create(RoomDto roomDto, String username);

    Room findByName(String roomName);

    List<Room> findAll();

    Room deleteByName(String roomName, String username);

    Room addMember(Room room, String username);

    Room removeMember(Room room, String username);

    Room addMember(String roomName, String username);

    Room removeMember(String roomName, String username);

    Room kickMember(String roomName, String member, String username);

    void handlePassword(String roomName, String password);

    Room startGame(String roomName, String username);
}
