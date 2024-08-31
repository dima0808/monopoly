package com.civka.monopoly.api.service.impl;

import com.civka.monopoly.api.entity.Event;
import com.civka.monopoly.api.entity.Member;
import com.civka.monopoly.api.payload.EventMessage;
import com.civka.monopoly.api.repository.EventRepository;
import com.civka.monopoly.api.service.EventService;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EventServiceImpl implements EventService {

    private final EventRepository eventRepository;
    private final SimpMessagingTemplate messagingTemplate;

    @Override
    public Event save(Event event) {
        return eventRepository.save(event);
    }

    @Override
    public Event add(Member member, Event.EventType type) {
        Event event = Event.builder()
                .member(member)
                .type(type)
                .build();
        EventMessage eventMessage = EventMessage.builder()
                .type(EventMessage.MessageType.ADD_EVENT)
                .content("Event added: " + type)
                .event(event)
                .build();
        messagingTemplate.convertAndSendToUser(member.getUser().getUsername(), "/queue/events", eventMessage);
        return eventRepository.save(event);
    }

    @Override
    public Event delete(Member member, Event.EventType type) {
        Event event = eventRepository.findByMemberAndType(member, type).orElse(null);

        if (event != null) {
            eventRepository.delete(event);
            EventMessage eventMessage = EventMessage.builder()
                    .type(EventMessage.MessageType.DELETE_EVENT)
                    .content("Event deleted: " + type)
                    .event(event)
                    .build();
            messagingTemplate.convertAndSendToUser(member.getUser().getUsername(), "/queue/events", eventMessage);
        }
        return event;
    }
}
