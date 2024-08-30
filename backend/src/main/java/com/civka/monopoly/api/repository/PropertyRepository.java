package com.civka.monopoly.api.repository;

import com.civka.monopoly.api.entity.Property;
import com.civka.monopoly.api.entity.Room;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PropertyRepository extends JpaRepository<Property, Long> {

    Boolean existsByRoomAndPosition(Room room, Integer position);
}
