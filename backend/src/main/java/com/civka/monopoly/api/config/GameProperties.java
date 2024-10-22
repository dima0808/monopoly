package com.civka.monopoly.api.config;

import com.civka.monopoly.api.entity.*;
import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

import java.util.Map;

@Setter
@Getter
@Configuration
@ConfigurationProperties(prefix = "monopoly.app.room.game")
public class GameProperties {

    private Map<String, Integer> price;
    private Map<String, Integer> goldOnStep;
    private Map<String, Integer> tourismOnStep;
    private Map<String, Integer> perTurn;
    private Map<String, String> requirement;
    private Map<String, String> upgrade;
    private Map<String, Integer> armySpending;
    private Map<String, Integer> event;
    private Map<String, Integer> project;
    private Map<String, Integer> additionalGoldPerTurn;

    public Integer getPriceByPositionAndLevel(Integer position, Property.Upgrade level) {
        return price.get(position + "." + level);
    }

    public Integer getGoldOnStepByPositionAndLevel(Integer position, Property.Upgrade level) {
        return goldOnStep.get(position + "." + level);
    }

    public Integer getTourismOnStepByPositionAndLevel(Integer position, Property.Upgrade level) {
        return tourismOnStep.get(position + "." + level);
    }

    public Integer getPerTurnByPositionAndLevel(Integer position, Property.Upgrade level) {
        return perTurn.get(position + "." + level);
    }

    public int getStrengthFromArmySpending(ArmySpending armySpendingLevel) {
        return armySpending.get(armySpendingLevel + ".strength");
    }

    public int getGoldFromArmySpending(ArmySpending armySpendingLevel) {
        return armySpending.get(armySpendingLevel + ".gold");
    }

    public int getEventGold(Event.EventType eventType) {
        return event.get(eventType + ".gold");
    }

    public int getEventStrength(Event.EventType eventType) {
        return event.get(eventType + ".strength");
    }

    public float getEventCoefficient(Event.EventType eventType) {
        return event.get(eventType + ".coefficient") / 100f;
    }

    public int getEventDice(Event.EventType eventType) {
        return event.get(eventType + ".dice");
    }

    public int getHireIncome(Event.EventType eventType) {
        return event.get(eventType + ".hireIncome");
    }

    public int getHirePrice(Event.EventType eventType) {
        return event.get(eventType + ".hirePrice");
    }

    public int getBreadAndCircusesByLevelPlus(Property.Upgrade level) {
        return project.get("BREAD_AND_CIRCUSES." + level + ".plus");
    }

    public int getBreadAndCircusesByLevelMinus(Property.Upgrade level) {
        return project.get("BREAD_AND_CIRCUSES." + level + ".minus");
    }

    public int getGoldPerTurnByAdditionalEffect(AdditionalEffect.AdditionalEffectType type) {
        return additionalGoldPerTurn.get(type.toString());
    }
}