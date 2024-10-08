package com.civka.monopoly.api.service.impl;

import com.civka.monopoly.api.entity.Event;
import com.civka.monopoly.api.entity.Member;
import com.civka.monopoly.api.payload.EventMessage;
import com.civka.monopoly.api.repository.EventRepository;
import com.civka.monopoly.api.repository.MemberRepository;
import com.civka.monopoly.api.service.EventService;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;

@Service
@RequiredArgsConstructor
public class EventServiceImpl implements EventService {

    private final EventRepository eventRepository;
    private final SimpMessagingTemplate messagingTemplate;
    private final GameUtilsImpl gameUtils;
    private final MemberRepository memberRepository;

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
}
