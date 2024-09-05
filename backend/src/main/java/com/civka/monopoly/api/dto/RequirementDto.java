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
        OWN_ENCAMPMENT_1,
        OWN_CAMPUS_1, OWN_LIBRARY_1,
        OWN_GOVERNMENT_PLAZA,
        OWN_ENTERTAINMENT_COMPLEX_1, OWN_ARENA_1,
        OWN_HARBOR_2,
        OWN_INDUSTRIAL_ZONE_2, OWN_FACTORY_2,
        OWN_ENTERTAINMENT_COMPLEX_2, OWN_STADIUM_2,
        OWN_COMMERCIAL_HUB_2, OWN_STOCK_EXCHANGE_2,
        OWN_CAMPUS_2, OWN_UNIVERSITY_2,
    }
}
