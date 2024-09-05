package com.civka.monopoly.api.service;

import com.civka.monopoly.api.dto.RequirementDto;
import com.civka.monopoly.api.entity.Member;
import com.civka.monopoly.api.entity.Property;

import java.util.List;
import java.util.Map;

public interface GameUtils {

    int calculateGoldOnStep(Property property);

    int getGoldOnStepByLevel(Integer position, Property.Upgrade level);

    int calculateGoldPerTurn(Property property);

    int getGoldPerTurnByLevel(Integer position, Property.Upgrade level);

    int getPriceByPosition(Integer position);

    Map<String, Integer> getPriceProperties();

    List<RequirementDto> getRequirements(Integer position, Member member);
}
