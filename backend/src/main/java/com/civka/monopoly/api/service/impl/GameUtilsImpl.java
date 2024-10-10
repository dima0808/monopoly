package com.civka.monopoly.api.service.impl;

import com.civka.monopoly.api.config.GameProperties;
import com.civka.monopoly.api.dto.ArmySpendingDto;
import com.civka.monopoly.api.dto.RequirementDto;
import com.civka.monopoly.api.dto.UpgradeDto;
import com.civka.monopoly.api.entity.Event;
import com.civka.monopoly.api.entity.Member;
import com.civka.monopoly.api.entity.Property;
import com.civka.monopoly.api.service.GameUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class GameUtilsImpl implements GameUtils {

    private final GameProperties gameProperties;

    @Override
    public int calculateGoldOnStep(Property property) {
        int onStep = 0;
        if (property.getMortgage() != -1) {
            return 0;
        }
        for (Property.Upgrade upgrade : property.getUpgrades()) {
            Integer upgradeOnStep = gameProperties.getOnStepByPositionAndLevel(property.getPosition(), upgrade);
            if (upgradeOnStep != null) {
                onStep += upgradeOnStep;
            }
        }
        return onStep;
    }

    @Override
    public int getGoldOnStepByLevel(Integer position, Property.Upgrade level) {
        return gameProperties.getOnStepByPositionAndLevel(position, level);
    }

    @Override
    public int calculateGoldPerTurn(Property property) {
        int perTurn = 0;
        if (property.getMortgage() != -1) {
            return 0;
        }
        for (Property.Upgrade upgrade : property.getUpgrades()) {
            Integer upgradePerTurn = gameProperties.getPerTurnByPositionAndLevel(property.getPosition(), upgrade);
            if (upgradePerTurn != null) {
                perTurn += upgradePerTurn;
            }
        }
        return perTurn;
    }

    @Override
    public int calculateGeneralGoldPerTurn(Member member) {
        return member.getProperties().stream()
                .map(this::calculateGoldPerTurn)
                .reduce(0, Integer::sum);
    }

    @Override
    public int getGoldPerTurnByLevel(Integer position, Property.Upgrade level) {
        return gameProperties.getPerTurnByPositionAndLevel(position, level);
    }

    @Override
    public int getPriceByPositionAndLevel(Integer position, Property.Upgrade level) {
        return gameProperties.getPriceByPositionAndLevel(position, level);
    }

    @Override
    public int getStrengthFromArmySpending(Member.ArmySpending armySpendingLevel) {
        return gameProperties.getStrengthFromArmySpending(armySpendingLevel);
    }

    @Override
    public int getGoldFromArmySpending(Member.ArmySpending armySpendingLevel) {
        return gameProperties.getGoldFromArmySpending(armySpendingLevel);
    }

    @Override
    public Map<String, String> getUpgradeProperties() {
        return gameProperties.getUpgrade();
    }

    @Override
    public List<RequirementDto> getRequirements(Integer position, Member member) {
        List<RequirementDto> allRequirements = new ArrayList<>();
        for (Property.Upgrade upgrade : List.of(Property.Upgrade.LEVEL_1, Property.Upgrade.LEVEL_2,
                Property.Upgrade.LEVEL_3, Property.Upgrade.LEVEL_4)) {
            String requirements = gameProperties.getRequirement().get(position + "." + upgrade);
            if (requirements != null) {
                Map<RequirementDto.Requirement, Boolean> requirementMap = new HashMap<>();
                for (String req : requirements.split(",")) {
                    RequirementDto.Requirement requirement = RequirementDto.Requirement.valueOf(req);
                    requirementMap.put(requirement, calculateRequirement(requirement, member));
                }
                allRequirements.add(RequirementDto.builder()
                        .level(upgrade)
                        .requirements(requirementMap)
                        .build());
            }
        }
        return allRequirements;
    }

    @Override
    public List<UpgradeDto> getUpgrades(Integer position, Property property) {
        List<UpgradeDto> upgrades = new ArrayList<>();
        for (String upgrade : gameProperties.getUpgrade().get(position.toString()).split(",")) {
            Property.Upgrade level = Property.Upgrade.valueOf(upgrade);
            UpgradeDto upgradeDto = UpgradeDto.builder()
                    .level(level)
                    .isOwned(property != null && property.getUpgrades().contains(level))
                    .goldOnStep(gameProperties.getOnStepByPositionAndLevel(position, level))
                    .goldPerTurn(gameProperties.getPerTurnByPositionAndLevel(position, level))
                    .price(gameProperties.getPriceByPositionAndLevel(position, level))
                    .build();
            upgrades.add(upgradeDto);
        }
        return upgrades;
    }

    @Override
    public List<ArmySpendingDto> getArmySpendings() {
        List<ArmySpendingDto> armySpendings = new ArrayList<>();
        for (Member.ArmySpending armySpending : Member.ArmySpending.values()) {
            ArmySpendingDto armySpendingDto = ArmySpendingDto.builder()
                    .armySpending(armySpending)
                    .gold(gameProperties.getGoldFromArmySpending(armySpending))
                    .strength(gameProperties.getStrengthFromArmySpending(armySpending))
                    .build();
            armySpendings.add(armySpendingDto);
        }
        return armySpendings;
    }

    @Override
    public int getEventGold(Event.EventType eventType) {
        return gameProperties.getEventGold(eventType);
    }

    @Override
    public int getEventStrength(Event.EventType eventType) {
        return gameProperties.getEventStrength(eventType);
    }

    @Override
    public float getEventCoefficient(Event.EventType eventType) {
        return gameProperties.getEventCoefficient(eventType);
    }

    @Override
    public int getEventDice(Event.EventType eventType) {
        return gameProperties.getEventDice(eventType);
    }

    @Override
    public int getHireIncome(Event.EventType eventType) {
        return gameProperties.getHireIncome(eventType);
    }

    @Override
    public int getHirePrice(Event.EventType eventType) {
        return gameProperties.getHirePrice(eventType);
    }

    private boolean calculateRequirement(RequirementDto.Requirement requirement, Member member) {
        return switch (requirement) {
            case OWN_DEER_OR_FURS -> member.getProperties().stream()
                    .anyMatch(p -> p.getPosition().equals(3) ||
                            p.getPosition().equals(5));
            case OWN_CAMP -> member.getProperties().stream()
                    .anyMatch(p -> (p.getPosition().equals(3) || p.getPosition().equals(5)) &&
                            p.getUpgrades().contains(Property.Upgrade.LEVEL_2));
            case OWN_ENCAMPMENT -> member.getProperties().stream()
                    .anyMatch(p -> p.getPosition().equals(7) || p.getPosition().equals(30));
            case OWN_CAMPUS -> member.getProperties().stream()
                    .anyMatch(p -> p.getPosition().equals(15) || p.getPosition().equals(45));
            case OWN_LIBRARY -> member.getProperties().stream()
                    .anyMatch(p -> (p.getPosition().equals(15) || p.getPosition().equals(45)) &&
                            p.getUpgrades().contains(Property.Upgrade.LEVEL_2));
            case OWN_GOVERNMENT_PLAZA -> member.getProperties().stream()
                    .anyMatch(p -> p.getPosition().equals(9) ||
                            p.getPosition().equals(18) ||
                            p.getPosition().equals(44));
            case NOT_OWN_GOVERNMENT_PLAZA -> member.getProperties().stream()
                    .noneMatch(p -> p.getPosition().equals(9) ||
                            p.getPosition().equals(18) ||
                            p.getPosition().equals(44));
            case OWN_ENTERTAINMENT_COMPLEX -> member.getProperties().stream()
                    .anyMatch(p -> p.getPosition().equals(22) || p.getPosition().equals(38));
            case OWN_ARENA -> member.getProperties().stream()
                    .anyMatch(p -> (p.getPosition().equals(22) || p.getPosition().equals(38)) &&
                            p.getUpgrades().contains(Property.Upgrade.LEVEL_2));
            case OWN_HARBOR -> member.getProperties().stream()
                    .anyMatch(p -> p.getPosition().equals(17) || p.getPosition().equals(31));
            case OWN_INDUSTRIAL_ZONE -> member.getProperties().stream()
                    .anyMatch(p -> p.getPosition().equals(10) || p.getPosition().equals(34));
            case OWN_FACTORY -> member.getProperties().stream()
                    .anyMatch(p -> (p.getPosition().equals(10) || p.getPosition().equals(34)) &&
                            p.getUpgrades().contains(Property.Upgrade.LEVEL_4));
            case OWN_STADIUM -> member.getProperties().stream()
                    .anyMatch(p -> (p.getPosition().equals(22) || p.getPosition().equals(38)) &&
                            p.getUpgrades().contains(Property.Upgrade.LEVEL_4));
            case OWN_COMMERCIAL_HUB -> member.getProperties().stream()
                    .anyMatch(p -> p.getPosition().equals(19) || p.getPosition().equals(43));
            case OWN_STOCK_EXCHANGE -> member.getProperties().stream()
                    .anyMatch(p -> (p.getPosition().equals(19) || p.getPosition().equals(43)) &&
                            p.getUpgrades().contains(Property.Upgrade.LEVEL_4));
            case OWN_UNIVERSITY -> member.getProperties().stream()
                    .anyMatch(p -> (p.getPosition().equals(15) || p.getPosition().equals(45)) &&
                            p.getUpgrades().contains(Property.Upgrade.LEVEL_3));
        };
    }
}
