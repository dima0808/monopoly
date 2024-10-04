package com.civka.monopoly.api.dto;

import com.civka.monopoly.api.entity.Property;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.Map;

@AllArgsConstructor
@Getter
@Setter
@Builder
public class RequirementDto {

    private Property.Upgrade level;

    private Map<Requirement, Boolean> requirements;

    public enum Requirement {
        OWN_DEER_OR_FURS, OWN_CAMP,
        OWN_ENCAMPMENT,
        OWN_CAMPUS, OWN_LIBRARY, OWN_UNIVERSITY,
        OWN_GOVERNMENT_PLAZA,
        NOT_OWN_GOVERNMENT_PLAZA,
        OWN_ENTERTAINMENT_COMPLEX, OWN_ARENA, OWN_STADIUM,
        OWN_HARBOR,
        OWN_INDUSTRIAL_ZONE, OWN_FACTORY,
        OWN_COMMERCIAL_HUB, OWN_STOCK_EXCHANGE,
    }
}
