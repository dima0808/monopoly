package com.civka.monopoly.api.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.Collection;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
@Entity
@Table(name = "rooms")
public class Room {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private Integer size;

    @OneToOne
    private User creator;

    @OneToMany
    private Collection<User> members;
}
