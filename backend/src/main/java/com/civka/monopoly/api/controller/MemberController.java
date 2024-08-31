package com.civka.monopoly.api.controller;

import com.civka.monopoly.api.entity.Event;
import com.civka.monopoly.api.entity.Member;
import com.civka.monopoly.api.service.EventService;
import com.civka.monopoly.api.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

@Controller
@RequiredArgsConstructor
public class MemberController {

    private final UserService userService;
    private final EventService eventService;

    @MessageMapping("/members/{receiver}/addEvent/{type}")
    public Event addEvent(@DestinationVariable String receiver,
                          @DestinationVariable Event.EventType type) {
        Member member = userService.findByUsername(receiver).getMember();
        return eventService.add(member, type);
    }

    @MessageMapping("/members/{receiver}/deleteEvent/{type}")
    public Event deleteEvent(@DestinationVariable String receiver,
                             @DestinationVariable Event.EventType type) {
        Member member = userService.findByUsername(receiver).getMember();
        return eventService.delete(member, type);
    }

    @GetMapping("/api/members/{username}/events")
    public ResponseEntity<List<Event>> getEvents(@PathVariable String username) {
        Member member = userService.findByUsername(username).getMember();
        return ResponseEntity.ok(member.getEvents());
    }
}
