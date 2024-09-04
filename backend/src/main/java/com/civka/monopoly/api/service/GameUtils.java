package com.civka.monopoly.api.service;

import com.civka.monopoly.api.entity.Property;

import java.util.Map;

public interface GameUtils {

    int calculateGoldOnStep(Property property);

    int getGoldOnStepByLevel(Integer position, Property.Upgrade level);

    int calculateGoldPerTurn(Property property);

    int getGoldPerTurnByLevel(Integer position, Property.Upgrade level);

    int getPriceByPosition(Integer position);

    Map<String, Integer> getPriceProperties();
}
