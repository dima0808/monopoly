package com.civka.monopoly.api.service;

import com.civka.monopoly.api.entity.Room;

import java.util.List;

public interface RoomService {

    Room create(Room room, String username);

    Room findById(Long roomId);

    List<Room> findAll();

    Room deleteById(Long roomId, String username);

    Room addMember(Room room, String username);

    Room removeMember(Room room, String username);

    Room addMember(Long roomId, String username);

    Room removeMember(Long roomId, String username);

    Room kickMember(Long roomId, String member, String username);
}
