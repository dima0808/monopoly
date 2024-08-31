package com.civka.monopoly.api.service;

import com.civka.monopoly.api.entity.Event;
import com.civka.monopoly.api.entity.Member;

public interface EventService {

    Event save(Event event);

    Event add(Member member, Event.EventType type);

    Event delete(Member member, Event.EventType type);
}
