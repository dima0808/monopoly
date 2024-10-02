package com.civka.monopoly.api.service;

import com.civka.monopoly.api.dto.ArmySpendingDto;
import com.civka.monopoly.api.dto.RequirementDto;
import com.civka.monopoly.api.dto.UpgradeDto;
import com.civka.monopoly.api.entity.Event;
import com.civka.monopoly.api.entity.Member;
import com.civka.monopoly.api.entity.Property;

import java.util.List;
import java.util.Map;

public interface GameUtils {

    int calculateGoldOnStep(Property property);

    int getGoldOnStepByLevel(Integer position, Property.Upgrade level);

    int calculateGoldPerTurn(Property property);

    int calculateGeneralGoldPerTurn(Member member);

    int getGoldPerTurnByLevel(Integer position, Property.Upgrade level);

    int getPriceByPositionAndLevel(Integer position, Property.Upgrade level);

    int getStrengthFromArmySpending(Member.ArmySpending armySpending);

    int getGoldFromArmySpending(Member.ArmySpending armySpending);

    Map<String, String> getUpgradeProperties();

    List<RequirementDto> getRequirements(Integer position, Member member);

    List<UpgradeDto> getUpgrades(Integer position, Property property);

    List<ArmySpendingDto> getArmySpendings();

    int getEventGold(Event.EventType eventType);

    int getEventStrength(Event.EventType eventType);

    float getEventCoefficient(Event.EventType eventType);

    int getEventDice(Event.EventType eventType);

    int getHireIncome(Event.EventType eventType);

    int getHirePrice(Event.EventType eventType);
}
