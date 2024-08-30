package com.civka.monopoly.api.service.impl;

import com.civka.monopoly.api.entity.Property;
import com.civka.monopoly.api.entity.Room;
import com.civka.monopoly.api.repository.PropertyRepository;
import com.civka.monopoly.api.service.PropertyService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PropertyServiceImpl implements PropertyService {

    private final PropertyRepository propertyRepository;

    @Override
    public Property save(Property property) {
        return propertyRepository.save(property);
    }

    @Override
    public Boolean existsByRoomAndPosition(Room room, Integer position) {
        return propertyRepository.existsByRoomAndPosition(room, position);
    }
}
