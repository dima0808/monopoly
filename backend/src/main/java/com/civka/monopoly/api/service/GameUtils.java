package com.civka.monopoly.api.service;

import com.civka.monopoly.api.dto.ArmySpendingDto;
import com.civka.monopoly.api.dto.RequirementDto;
import com.civka.monopoly.api.dto.UpgradeDto;
import com.civka.monopoly.api.entity.*;

import java.util.List;
import java.util.Map;

public interface GameUtils {

    int calculateGoldOnStep(Property property);

    int getGoldOnStepByLevel(Integer position, Property.Upgrade level);

    int calculateTourismOnStep(Property property);

    int getTourismOnStepByLevel(Integer position, Property.Upgrade upgrade);

    int calculateGoldPerTurn(Property property);

    int calculateGeneralGoldPerTurn(Member member);

    int getGoldPerTurnByLevel(Integer position, Property.Upgrade level);

    int getPriceByPositionAndLevel(Integer position, Property.Upgrade level);

    int getStrengthFromArmySpending(ArmySpending armySpending);

    int getGoldFromArmySpending(ArmySpending armySpending);

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

    int getBreadAndCircusesByLevel(Property.Upgrade level, boolean isPlus);

    int getGoldPerTurnByAdditionalEffect(AdditionalEffect.AdditionalEffectType type);
}
