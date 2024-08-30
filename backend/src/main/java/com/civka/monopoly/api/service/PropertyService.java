package com.civka.monopoly.api.service;

import com.civka.monopoly.api.entity.Property;
import com.civka.monopoly.api.entity.Room;

public interface PropertyService {

    Property save(Property property);

    Boolean existsByRoomAndPosition(Room room, Integer position);
}
