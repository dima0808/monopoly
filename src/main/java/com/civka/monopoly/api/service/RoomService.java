package com.civka.monopoly.api.service;

import com.civka.monopoly.api.entity.Room;

import java.util.List;

public interface RoomService {

    Room create(Room room, String username);

    Room findById(Long roomId);

    List<Room> findAll();

    void deleteById(Long roomId);

    Room addMember(Room room, String username);

    Room addMember(Long roomId, String username);
}
