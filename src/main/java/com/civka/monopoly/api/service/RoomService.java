package com.civka.monopoly.api.service;

import com.civka.monopoly.api.entity.Room;

import java.util.List;

public interface RoomService {

    Room createRoom(Room room);

    List<Room> findAllRooms();

    void deleteRoom(Long roomId);
}
