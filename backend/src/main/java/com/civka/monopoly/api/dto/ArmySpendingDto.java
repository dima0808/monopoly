package com.civka.monopoly.api.dto;

import com.civka.monopoly.api.entity.Member;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Getter
@Setter
@Builder
public class ArmySpendingDto {

    private Member.ArmySpending armySpending;

    private Integer gold;

    private Integer strength;
}
