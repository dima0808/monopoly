package com.civka.monopoly.api.dto;

import com.civka.monopoly.api.entity.Member;
import com.civka.monopoly.api.entity.Property;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@AllArgsConstructor
@Getter
@Setter
@Builder
public class PropertyDto {

    private Long id;

    private Member member;

    private List<Property.Upgrade> upgradeLevel;

    private Integer position;

    private Integer goldOnStep;
    private Integer goldPerTurn;
    private Integer price;
}