package com.civka.monopoly.api.service.impl;

import com.civka.monopoly.api.dto.ChatMessageDto;
import com.civka.monopoly.api.dto.PropertyDto;
import com.civka.monopoly.api.entity.*;
import com.civka.monopoly.api.payload.DiceMessage;
import com.civka.monopoly.api.payload.PlayerMessage;
import com.civka.monopoly.api.repository.MemberRepository;
import com.civka.monopoly.api.service.*;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService {

    private final MemberRepository memberRepository;
    private final SimpMessagingTemplate messagingTemplate;
    private final ChatService chatService;
    private final ChatMessageService chatMessageService;
    private final EventService eventService;
    private final PropertyService propertyService;
    private final GameUtils gameUtils;

    @Override
    public Member save(Member member) {
        return memberRepository.save(member);
    }

    @Override
    public void delete(Member member) {
        memberRepository.delete(member);
    }

    @Override
    public void deleteById(Long id) {
        memberRepository.deleteById(id);
    }

    @Override
    public DiceMessage rollDice(Member member) {
        if (!member.getRoom().getCurrentTurn().equals(member.getUser().getUsername()) || member.getHasRolledDice()) {
            throw new UserNotAllowedException();
        }
        int firstRoll = (int) (Math.random() * 6) + 1;
        int secondRoll = (int) (Math.random() * 6) + 1;
        int newPosition = member.getPosition() + firstRoll + secondRoll;
        if (newPosition > 47) {
            newPosition -= 48;
        }
        member.setPosition(newPosition);
        member.setHasRolledDice(true);
        Member updatedMember = memberRepository.save(member);

        Room room = updatedMember.getRoom();
        int finalNewPosition = newPosition;
        if (newPosition == 0) {
//            eventService.add(updatedMember, Event.EventType.START);
        } else if (newPosition == 13 || newPosition == 37) {
//            eventService.add(updatedMember, Event.EventType.PROJECTS);
        } else if (newPosition == 24) {
//            eventService.add(updatedMember, Event.EventType.BERMUDA);
        } else if (newPosition == 6) {
//            eventService.add(updatedMember, Event.EventType.GOODY_HUT);
        } else if (newPosition == 29) {
//            eventService.add(updatedMember, Event.EventType.BARBARIANS);
        } else if (room.getProperties().stream()
                .noneMatch(property -> property.getPosition().equals(finalNewPosition))) {
            eventService.add(updatedMember, Event.EventType.BUY_PROPERTY);
        } else if (updatedMember.getProperties().stream()
                .noneMatch(property -> property.getPosition().equals(finalNewPosition))) {
            eventService.add(updatedMember, Event.EventType.FOREIGN_PROPERTY);
        }

        Chat roomChat = chatService.findByName(room.getName());
        ChatMessageDto systemMessage = ChatMessageDto.builder()
                .type(ChatMessage.MessageType.SYSTEM_ROLL_DICE)
                .content(updatedMember.getUser().getNickname() + " " + firstRoll + " " + secondRoll)
                .timestamp(LocalDateTime.now())
                .build();
        ChatMessage chatMessage = chatMessageService.save(roomChat, systemMessage);
        messagingTemplate.convertAndSend("/topic/chat/" + roomChat.getName(), chatMessage);

        return DiceMessage.builder()
                .type(PlayerMessage.MessageType.ROLL_DICE)
                .content("Player " + updatedMember.getUser().getNickname() + " rolled dice: " + firstRoll + " and " + secondRoll)
                .firstRoll(firstRoll)
                .secondRoll(secondRoll)
                .member(updatedMember)
                .build();
    }

    @Override
    public PropertyDto buyProperty(Member member, Integer position) {
        if (!member.getPosition().equals(position) ||
                propertyService.existsByRoomAndPosition(member.getRoom(), position)) {
            throw new UserNotAllowedException();
        }
        int price = gameUtils.getPriceByPosition(position);
        if (member.getGold() < price) {
            throw new UserNotAllowedException();
        }
        member.setGold(member.getGold() - price);
        Member updatedMember = memberRepository.save(member);

        Room room = updatedMember.getRoom();
        eventService.delete(updatedMember, Event.EventType.BUY_PROPERTY);
        Property property = Property.builder()
                .member(updatedMember)
                .room(room)
                .upgradeLevel(List.of(Property.Upgrade.LEVEL_1))
                .position(position)
                .build();
        Property updatedProperty = propertyService.save(property);

        Chat roomChat = chatService.findByName(room.getName());
        ChatMessageDto systemMessage = ChatMessageDto.builder()
                .type(ChatMessage.MessageType.SYSTEM_BUY_PROPERTY)
                .content(updatedMember.getUser().getNickname() + " " + position + " " + price)
                .timestamp(LocalDateTime.now())
                .build();
        ChatMessage chatMessage = chatMessageService.save(roomChat, systemMessage);
        messagingTemplate.convertAndSend("/topic/chat/" + roomChat.getName(), chatMessage);

        return PropertyDto.builder()
                .id(updatedProperty.getId())
                .member(updatedProperty.getMember())
                .upgradeLevel(updatedProperty.getUpgradeLevel())
                .position(updatedProperty.getPosition())
                .goldOnStep(gameUtils.calculateGoldOnStep(updatedProperty))
                .goldPerTurn(gameUtils.calculateGoldPerTurn(property))
                .build();
    }

    @Override
    public PropertyDto payRent(Member member, Integer position) {
        if (!member.getPosition().equals(position) ||
                !propertyService.existsByRoomAndPosition(member.getRoom(), position)) {
            throw new UserNotAllowedException();
        }
        Property property = propertyService.findByRoomAndPosition(member.getRoom(), position);
        int onStep = gameUtils.calculateGoldOnStep(property);
        if (member.getGold() < onStep) {
            throw new UserNotAllowedException();
        }
        member.setGold(member.getGold() - onStep);
        memberRepository.save(member);
        Member owner = property.getMember();
        owner.setGold(owner.getGold() + onStep);
        memberRepository.save(owner);

        Chat roomChat = chatService.findByName(member.getRoom().getName());
        ChatMessageDto systemMessage = ChatMessageDto.builder()
                .type(ChatMessage.MessageType.SYSTEM_PAY_RENT)
                .content(member.getUser().getNickname() + " " + onStep + " " + property.getMember().getUser().getNickname())
                .timestamp(LocalDateTime.now())
                .build();
        ChatMessage chatMessage = chatMessageService.save(roomChat, systemMessage);
        messagingTemplate.convertAndSend("/topic/chat/" + roomChat.getName(), chatMessage);

        eventService.delete(member, Event.EventType.FOREIGN_PROPERTY);

        return PropertyDto.builder()
                .id(property.getId())
                .member(property.getMember())
                .upgradeLevel(property.getUpgradeLevel())
                .position(property.getPosition())
                .goldOnStep(onStep)
                .goldPerTurn(gameUtils.calculateGoldPerTurn(property))
                .build();
    }
}
