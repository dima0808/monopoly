package com.civka.monopoly.api.service.impl;

import com.civka.monopoly.api.dto.ChatMessageDto;
import com.civka.monopoly.api.entity.*;
import com.civka.monopoly.api.payload.EventMessage;
import com.civka.monopoly.api.payload.PlayerMessage;
import com.civka.monopoly.api.repository.EventRepository;
import com.civka.monopoly.api.repository.MemberRepository;
import com.civka.monopoly.api.service.ChatMessageService;
import com.civka.monopoly.api.service.ChatService;
import com.civka.monopoly.api.service.EventService;
import com.civka.monopoly.api.service.PropertyService;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;

@Service
@RequiredArgsConstructor
public class EventServiceImpl implements EventService {

    private final EventRepository eventRepository;
    private final SimpMessagingTemplate messagingTemplate;
    private final GameUtilsImpl gameUtils;
    private final MemberRepository memberRepository;
    private final ChatService chatService;
    private final ChatMessageService chatMessageService;
    private final PropertyService propertyService;

    @Override
    public Event save(Event event) {
        return eventRepository.save(event);
    }

    @Override
    public Event findByMemberAndType(Member member, Event.EventType type) {
        return eventRepository.findByMemberAndType(member, type).orElse(null);
    }

    @Override
    public Event add(Member member, Event.EventType type, Integer roll) {
        if (type == Event.EventType.FOREIGN_PROPERTY) {
            Property property = propertyService.findByRoomAndPosition(member.getRoom(), member.getPosition());
            Member owner = property.getMember();
            owner.setTourism(owner.getTourism() + gameUtils.calculateTourismOnStep(property));
            memberRepository.save(owner);

            PlayerMessage playerMessage = PlayerMessage.builder()
                    .type(PlayerMessage.MessageType.TOURIST)
                    .content("Member " + member.getUser().getUsername() + " visited " +
                            owner.getUser().getUsername() + "'s property")
                    .member(owner)
                    .build();
            messagingTemplate.convertAndSend("/topic/public/" + member.getRoom().getName() + "/game", playerMessage);
        }
        Event event = Event.builder()
                .member(member)
                .type(type)
                .roll(roll)
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
    public Event add(Member member, Event.EventType type) {
        return add(member, type, null);
    }

    @Override
    public Event delete(Member member, Event.EventType type) {
        Event event = findByMemberAndType(member, type);

        if (event != null) {
            if (type == Event.EventType.BERMUDA) {
                handleBermudaTriangle(member, -1);
            }
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

    @Override
    public Event makeChoice(Member member, Event.EventType type, Integer choice) {
        switch (type) {
            case GOODY_HUT_FREE_GOLD:
            case GOODY_HUT_JACKPOT:
                member.setGold(member.getGold() + gameUtils.getEventGold(type));
                break;
            case GOODY_HUT_FREE_STRENGTH:
                member.setStrength(member.getStrength() + gameUtils.getEventStrength(type));
                break;
            case GOODY_HUT_FREE_GOLD_OR_STRENGTH:
                if (choice == 1) {
                    member.setGold(member.getGold() + gameUtils.getEventGold(type));
                } else {
                    member.setStrength(member.getStrength() + gameUtils.getEventStrength(type));
                }
                break;
            case GOODY_HUT_HAPPY_BIRTHDAY:
                for (Member m : member.getRoom().getMembers()) {
                    m.setGold(m.getGold() - gameUtils.getEventGold(type));
                    member.setGold(member.getGold() + gameUtils.getEventGold(type));
                }
                break;
            case GOODY_HUT_WONDER_DISCOUNT:
            case GOODY_HUT_DICE_BUFF:
                // todo
                break;
            case BARBARIANS_PAY_GOLD_OR_STRENGTH:
                if (choice == 1) {
                    member.setGold(member.getGold() - gameUtils.getEventGold(type));
                } else {
                    member.setStrength(member.getStrength() - gameUtils.getEventStrength(type));
                }
                break;
            case BARBARIANS_PAY_GOLD_OR_HIRE:
                if (choice == 0) {
                    member.setGold(member.getGold() - gameUtils.getEventGold(type));
                } else {
                    member.setStrength(member.getStrength() + gameUtils.getHireIncome(type));
                    member.setGold(member.getGold() - gameUtils.getHirePrice(type));
                }
                break;
            case BARBARIANS_PAY_STRENGTH:
                member.setStrength(member.getStrength() - gameUtils.getEventStrength(type));
                break;
            case BARBARIANS_ATTACK_NEIGHBOR:
            case BARBARIANS_RAID:
            case BARBARIANS_PILLAGE:
            case BARBARIANS_RAGNAROK:
                // todo
                break;
            default:
                break;
        }
        memberRepository.save(member);
        return delete(member, type);
    }

    @Override
    public Event.EventType randomGoodyHutEvent() {
        List<Event.EventType> goodyHutEvents = Arrays.asList(
                Event.EventType.GOODY_HUT_FREE_GOLD,
                Event.EventType.GOODY_HUT_FREE_STRENGTH,
                Event.EventType.GOODY_HUT_FREE_GOLD_OR_STRENGTH,
                Event.EventType.GOODY_HUT_HAPPY_BIRTHDAY,
                Event.EventType.GOODY_HUT_WONDER_DISCOUNT,
                Event.EventType.GOODY_HUT_DICE_BUFF,
                Event.EventType.GOODY_HUT_JACKPOT
        );
        return goodyHutEvents.get((int) (Math.random() * goodyHutEvents.size()));
    }

    @Override
    public Event.EventType randomBarbariansEvent() {
        List<Event.EventType> barbariansEvents = Arrays.asList(
                Event.EventType.BARBARIANS_PAY_GOLD_OR_STRENGTH,
                Event.EventType.BARBARIANS_PAY_GOLD_OR_HIRE,
                Event.EventType.BARBARIANS_PAY_STRENGTH,
                Event.EventType.BARBARIANS_ATTACK_NEIGHBOR,
                Event.EventType.BARBARIANS_RAID,
                Event.EventType.BARBARIANS_PILLAGE,
                Event.EventType.BARBARIANS_RAGNAROK
        );
        return barbariansEvents.get((int) (Math.random() * barbariansEvents.size()));
    }

    @Override
    public void handleNewPosition(int newPosition, Member member, int firstRoll, int secondRoll) {
        if (newPosition == 0) {
            // nothing happens
        } else if (newPosition == 13 || newPosition == 37) {
//            add(member, Event.EventType.PROJECTS);
        } else if (newPosition == 24) {
            add(member, Event.EventType.BERMUDA);
        } else if (newPosition == 6) {
            add(member, randomGoodyHutEvent());
        } else if (newPosition == 29) {
            add(member, randomBarbariansEvent());
        } else if (member.getRoom().getProperties().stream()
                .noneMatch(property -> property.getPosition().equals(newPosition))) {
            add(member, Event.EventType.BUY_PROPERTY);
        } else if (member.getProperties().stream()
                .noneMatch(property -> property.getPosition().equals(newPosition))) {
            if (newPosition == 7 || newPosition == 30) {
                add(member, Event.EventType.FOREIGN_PROPERTY, firstRoll + secondRoll);
            } else {
                add(member, Event.EventType.FOREIGN_PROPERTY);
            }
        }
    }

    @Override
    public Room handleBermudaTriangle(Member member, int requiredPosition) {
        int newPosition = requiredPosition == -1 ? (int) (Math.random() * 48) : requiredPosition;
        if (newPosition == 24 && requiredPosition == -1) {
            newPosition = 29; // Easter Egg with barbs
        }
        int oldPosition = member.getPosition();
        member.setPosition(newPosition);
        Member updatedMember = memberRepository.save(member);
        handleNewPosition(newPosition, updatedMember, 0, requiredPosition == -1 ? 1 : newPosition - oldPosition);

        String roomName = updatedMember.getRoom().getName();
        Chat roomChat = chatService.findByName(roomName);
        ChatMessageDto systemMessage = ChatMessageDto.builder()
                .type(ChatMessage.MessageType.SYSTEM_BERMUDA)
                .content(updatedMember.getUser().getNickname() + " " + newPosition)
                .timestamp(LocalDateTime.now())
                .build();
        ChatMessage chatMessage = chatMessageService.save(roomChat, systemMessage);
        messagingTemplate.convertAndSend("/topic/chat/" + roomChat.getName(), chatMessage);

        PlayerMessage playerMessage = PlayerMessage.builder()
                .type(PlayerMessage.MessageType.BERMUDA)
                .content("Member " + updatedMember.getUser().getUsername() + " teleported to " + newPosition)
                .member(updatedMember)
                .build();
        messagingTemplate.convertAndSend("/topic/public/" + roomName + "/game", playerMessage);
        return member.getRoom();
    }
}
