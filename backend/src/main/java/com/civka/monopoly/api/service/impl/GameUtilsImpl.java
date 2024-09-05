package com.civka.monopoly.api.service.impl;

import com.civka.monopoly.api.config.GameProperties;
import com.civka.monopoly.api.dto.RequirementDto;
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
        for (Property.Upgrade upgrade : property.getUpgrades()) {
            Integer upgradePerTurn = gameProperties.getPerTurnByPositionAndLevel(property.getPosition(), upgrade);
            if (upgradePerTurn != null) {
                perTurn += upgradePerTurn;
            }
        }
        return perTurn;
    }

    @Override
    public int getGoldPerTurnByLevel(Integer position, Property.Upgrade level) {
        return gameProperties.getPerTurnByPositionAndLevel(position, level);
    }

    @Override
    public int getPriceByPosition(Integer position) {
        return gameProperties.getPriceByPosition(position);
    }

    @Override
    public Map<String, Integer> getPriceProperties() {
        return gameProperties.getPrice();
    }

    @Override
    public List<RequirementDto> getRequirements(Integer position, Member member) {
        List<RequirementDto> allRequirements = new ArrayList<>();
        for (Property.Upgrade upgrade :
                List.of(Property.Upgrade.LEVEL_1, Property.Upgrade.LEVEL_2, Property.Upgrade.LEVEL_3)) {
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

    private boolean calculateRequirement(RequirementDto.Requirement requirement, Member member) {
        return switch (requirement) {
            case OWN_DEER_OR_FURS -> member.getProperties().stream()
                    .anyMatch(p -> p.getPosition().equals(3) ||
                            p.getPosition().equals(5));
            case OWN_CAMP -> member.getProperties().stream()
                    .anyMatch(p -> (p.getPosition().equals(3) || p.getPosition().equals(5)) &&
                            p.getUpgrades().contains(Property.Upgrade.LEVEL_2));
            case OWN_ENCAMPMENT_1 -> member.getProperties().stream()
                    .anyMatch(p -> p.getPosition().equals(7));
            case OWN_CAMPUS_1 -> member.getProperties().stream()
                    .anyMatch(p -> p.getPosition().equals(15));
            case OWN_LIBRARY_1 -> member.getProperties().stream()
                    .anyMatch(p -> p.getPosition().equals(15) &&
                            p.getUpgrades().contains(Property.Upgrade.LEVEL_2));
            case OWN_GOVERNMENT_PLAZA -> member.getProperties().stream()
                    .anyMatch(p -> p.getPosition().equals(9) ||
                            p.getPosition().equals(18) ||
                            p.getPosition().equals(44));
            case OWN_ENTERTAINMENT_COMPLEX_1 -> member.getProperties().stream()
                    .anyMatch(p -> p.getPosition().equals(22));
            case OWN_ARENA_1 -> member.getProperties().stream()
                    .anyMatch(p -> p.getPosition().equals(22) &&
                            p.getUpgrades().contains(Property.Upgrade.LEVEL_2));
            case OWN_HARBOR_2 -> member.getProperties().stream()
                    .anyMatch(p -> p.getPosition().equals(31));
            case OWN_INDUSTRIAL_ZONE_2 -> member.getProperties().stream()
                    .anyMatch(p -> p.getPosition().equals(34));
            case OWN_FACTORY_2 -> member.getProperties().stream()
                    .anyMatch(p -> p.getPosition().equals(34) &&
                            p.getUpgrades().contains(Property.Upgrade.LEVEL_4));
            case OWN_ENTERTAINMENT_COMPLEX_2 -> member.getProperties().stream()
                    .anyMatch(p -> p.getPosition().equals(38));
            case OWN_STADIUM_2 -> member.getProperties().stream()
                    .anyMatch(p -> p.getPosition().equals(38) &&
                            p.getUpgrades().contains(Property.Upgrade.LEVEL_4));
            case OWN_COMMERCIAL_HUB_2 -> member.getProperties().stream()
                    .anyMatch(p -> p.getPosition().equals(43));
            case OWN_STOCK_EXCHANGE_2 -> member.getProperties().stream()
                    .anyMatch(p -> p.getPosition().equals(43) &&
                            p.getUpgrades().contains(Property.Upgrade.LEVEL_4));
            case OWN_CAMPUS_2 -> member.getProperties().stream()
                    .anyMatch(p -> p.getPosition().equals(45));
            case OWN_UNIVERSITY_2 -> member.getProperties().stream()
                    .anyMatch(p -> p.getPosition().equals(45) &&
                            p.getUpgrades().contains(Property.Upgrade.LEVEL_3));
        };
    }
}
