package com.civka.monopoly.api.controller;

import com.civka.monopoly.api.entity.Civilization;
import com.civka.monopoly.api.entity.Member;
import com.civka.monopoly.api.payload.PlayerMessage;
import com.civka.monopoly.api.service.MemberService;
import com.civka.monopoly.api.service.RoomService;
import com.civka.monopoly.api.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.*;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

@Controller
@RequiredArgsConstructor
public class LobbyController {

    private final RoomService roomService;
    private final UserService userService;
    private final MemberService memberService;

    @MessageMapping("/rooms/{roomName}/changeCivilization/{civilization}")
    @SendTo("/topic/public/{roomName}/players")
    public PlayerMessage changeCivilization(@DestinationVariable Civilization civilization,
                                            @Header("username") String username) {
        Member member = userService.findByUsername(username).getMember();
        member.setCivilization(civilization);
        return PlayerMessage.builder()
                .type(PlayerMessage.MessageType.CHANGE_CIVILIZATION)
                .content("Member " + username + " changed civilization to " + civilization)
                .member(memberService.save(member))
                .build();
    }

    @GetMapping("/api/rooms/{roomName}/members")
    public ResponseEntity<List<Member>> getMembers(@PathVariable String roomName) {
        return ResponseEntity.ok(roomService.findByName(roomName).getMembers());
    }
}
