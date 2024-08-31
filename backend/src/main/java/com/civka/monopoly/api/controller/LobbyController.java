package com.civka.monopoly.api.controller;

import com.civka.monopoly.api.entity.Member;
import com.civka.monopoly.api.entity.Property;
import com.civka.monopoly.api.payload.DiceMessage;
import com.civka.monopoly.api.payload.PlayerMessage;
import com.civka.monopoly.api.payload.RoomMessage;
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
    public PlayerMessage changeCivilization(@DestinationVariable Member.Civilization civilization,
                                            @Header("username") String username) {
        Member member = userService.findByUsername(username).getMember();
        member.setCivilization(civilization);
        return PlayerMessage.builder()
                .type(PlayerMessage.MessageType.CHANGE_CIVILIZATION)
                .content("Member " + username + " changed civilization to " + civilization)
                .member(memberService.save(member))
                .build();
    }

    @MessageMapping("/rooms/{roomName}/changeColor/{color}")
    @SendTo({"/topic/public/{roomName}/players"})
    public PlayerMessage changeColor(@DestinationVariable Member.Color color,
                                            @Header("username") String username) {
        Member member = userService.findByUsername(username).getMember();
        member.setColor(color);
        return PlayerMessage.builder()
                .type(PlayerMessage.MessageType.CHANGE_COLOR)
                .content("Member " + username + " changed color to " + color)
                .member(memberService.save(member))
                .build();
    }

    @MessageMapping("/rooms/{roomName}/startGame")
    @SendTo({"/topic/public", "/topic/public/{roomName}/game"})
    public RoomMessage startGame(@DestinationVariable String roomName,
                                     @Header("username") String username) {
        return RoomMessage.builder()
                .type(RoomMessage.MessageType.START)
                .content("Game started")
                .room(roomService.startGame(roomName, username))
                .build();
    }

    @MessageMapping("/rooms/{roomName}/rollDice")
    @SendTo("/topic/public/{roomName}/game")
    public DiceMessage rollDice(@Header("username") String username) {
        Member member = userService.findByUsername(username).getMember();
        return memberService.rollDice(member);
    }

    @MessageMapping("/rooms/{roomName}/endTurn")
    @SendTo("/topic/public/{roomName}/game")
    public RoomMessage endTurn(@Header("username") String username) {
        Member member = userService.findByUsername(username).getMember();
        return RoomMessage.builder()
                .type(RoomMessage.MessageType.END_TURN)
                .content(username + "'s turn ended")
                .room(roomService.endTurn(member))
                .build();
    }

    @MessageMapping("/rooms/{roomName}/buyProperty/{position}")
    @SendTo("/topic/public/{roomName}/game")
    public RoomMessage buyProperty(@DestinationVariable Integer position,
                                   @Header("username") String username) {
        Member member = userService.findByUsername(username).getMember();
        return RoomMessage.builder()
                .type(RoomMessage.MessageType.BUY_PROPERTY)
                .content("Member " + username + " bought property on position " + position)
                .property(roomService.buyProperty(member, position))
                .build();
    }

    @GetMapping("/api/rooms/{roomName}/members")
    public ResponseEntity<List<Member>> getMembers(@PathVariable String roomName) {
        return ResponseEntity.ok(roomService.findByName(roomName).getMembers());
    }

    @GetMapping("/api/rooms/{roomName}/properties")
    public ResponseEntity<List<Property>> getProperties(@PathVariable String roomName) {
        return ResponseEntity.ok(roomService.findByName(roomName).getProperties());
    }
}
