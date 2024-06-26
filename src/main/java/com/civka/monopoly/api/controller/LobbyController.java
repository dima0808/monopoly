package com.civka.monopoly.api.controller;

import com.civka.monopoly.api.entity.Civilization;
import com.civka.monopoly.api.entity.Member;
import com.civka.monopoly.api.service.MemberService;
import com.civka.monopoly.api.service.RoomService;
import com.civka.monopoly.api.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.*;
import org.springframework.stereotype.Controller;

@Controller
@RequiredArgsConstructor
public class LobbyController {

    private final RoomService roomService;
    private final UserService userService;
    private final MemberService memberService;

    @MessageMapping("/rooms/{roomId}/changeCivilization/{civilization}")
    @SendTo("/topic/public/{roomId}")
    public Member changeCivilization(@DestinationVariable Civilization civilization,
                          @Header("username") String username) {
        Member member = userService.findByUsername(username).getMember();
        member.setCivilization(civilization);
        return memberService.save(member);
    }
}
