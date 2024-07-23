package com.civka.monopoly.api.service;

public class RoomNotFoundException extends RuntimeException {

    public RoomNotFoundException(Long roomId) {
        super(String.format("Room with id %d not found", roomId));
    }
}
