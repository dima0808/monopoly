package com.civka.monopoly.api.repository;

import com.civka.monopoly.api.entity.Chat;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ChatRepository extends JpaRepository<Chat, Long> {

    Optional<Chat> findByName(String name);

    Boolean existsByName(String name);
}
