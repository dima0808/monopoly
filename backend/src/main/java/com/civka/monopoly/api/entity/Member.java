package com.civka.monopoly.api.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
@Entity
@Table(name = "members")
public class Member {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.EAGER)
    private User user;

    @ManyToOne(fetch = FetchType.EAGER)
    @JsonIgnore
    private Room room;

    private Boolean isLeader;

    private Civilization civilization;
    private Color color;

    private Integer gold;
    private Integer strength;
    private Integer tourism;
    private Integer score;

    private Integer position;
    private Boolean hasRolledDice;

    private Integer finishedRounds;

    private List<ScienceProject> finishedScienceProjects;
    private Integer turnsToNextScienceProject;

    @OneToMany(mappedBy = "member", fetch = FetchType.EAGER, orphanRemoval = true, cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Property> properties = new ArrayList<>();

    @OneToMany(mappedBy = "member", fetch = FetchType.EAGER)
    @JsonIgnore
    private List<Event> events = new ArrayList<>();

    @OneToMany(mappedBy = "member", fetch = FetchType.EAGER, orphanRemoval = true, cascade = CascadeType.ALL)
    @JsonIgnore
    private List<AdditionalEffect> additionalEffects;

    public enum Civilization {
        Random,
        Colombia,
        Egypt,
        Germany,
        Japan,
        Korea,
        Rome,
        Sweden,
    }

    public enum Color {
        red,
        blue,
        green,
        yellow,
        turquoise,
        orange,
        pink,
        violet,
    }

    public enum ScienceProject {
        CAMPUS,
        SATELLITE,
        MOON,
        MARS,
        EXOPLANET,
        LASER,
    }
}
