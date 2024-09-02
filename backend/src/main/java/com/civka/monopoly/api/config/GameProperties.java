package com.civka.monopoly.api.config;

import com.civka.monopoly.api.entity.Property;
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
    private Map<String, Integer> onStep;

    public Integer getPriceByPosition(Integer position) {
        return price.get(position.toString());
    }

    public Integer getOnStepByPositionAndLevel(Integer position, Property.Upgrade level) {
        return onStep.get(position + "." + level);
    }
}