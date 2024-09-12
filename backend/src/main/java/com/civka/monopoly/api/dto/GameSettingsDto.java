package com.civka.monopoly.api.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@AllArgsConstructor
@Getter
@Setter
@Builder
public class GameSettingsDto {

    private List<ArmySpendingDto> armySpendings;

    private Double demoteGoldCoefficient;

    private Double mortgageGoldCoefficient;

    private Double redemptionCoefficient;
}
