package com.civka.monopoly.api.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

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
    private Integer goldPerTurn;
    private Integer strength;
    private Integer tourism;
    private Integer score;
    private ArmySpending armySpending;

    private Integer position;
    private Boolean hasRolledDice;

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

    public enum ArmySpending {
        Absent,
        Default,
        Medium,
        High,
    }
}
