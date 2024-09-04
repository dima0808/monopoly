package com.civka.monopoly.api.service.impl;

import com.civka.monopoly.api.dto.PropertyDto;
import com.civka.monopoly.api.entity.Property;
import com.civka.monopoly.api.entity.Room;
import com.civka.monopoly.api.repository.PropertyRepository;
import com.civka.monopoly.api.service.GameUtils;
import com.civka.monopoly.api.service.PropertyService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PropertyServiceImpl implements PropertyService {

    private final PropertyRepository propertyRepository;
    private final GameUtils gameUtils;

    @Override
    public Property save(Property property) {
        return propertyRepository.save(property);
    }

    @Override
    public Boolean existsByRoomAndPosition(Room room, Integer position) {
        return propertyRepository.existsByRoomAndPosition(room, position);
    }

    @Override
    public Property findByRoomAndPosition(Room room, Integer position) {
        return propertyRepository.findByRoomAndPosition(room, position).orElse(null);
    }

    @Override
    public List<PropertyDto> findByRoom(Room room) {
        List<Property> properties = propertyRepository.findByRoom(room);
        Map<String, Integer> priceMap = gameUtils.getPriceProperties();

        return priceMap.keySet().stream()
                .map(position -> {
                    Property property = properties.stream()
                            .filter(p -> p.getPosition().equals(Integer.parseInt(position)))
                            .findFirst()
                            .orElse(null);

                    if (property != null) {
                        return PropertyDto.builder()
                                .id(property.getId())
                                .member(property.getMember())
                                .upgradeLevel(property.getUpgradeLevel())
                                .position(property.getPosition())
                                .goldOnStep(gameUtils.calculateGoldOnStep(property))
                                .goldPerTurn(gameUtils.calculateGoldPerTurn(property))
                                .price(priceMap.get(position))
                                .build();
                    } else {
                        Integer positionInt = Integer.parseInt(position);
                        return PropertyDto.builder()
                                .position(positionInt)
                                .goldOnStep(gameUtils.getGoldOnStepByLevel(positionInt, Property.Upgrade.LEVEL_1))
                                .goldPerTurn(gameUtils.getGoldPerTurnByLevel(positionInt, Property.Upgrade.LEVEL_1))
                                .price(priceMap.get(position))
                                .build();
                    }
                })
                .collect(Collectors.toList());
    }
}
