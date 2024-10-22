package com.civka.monopoly.api.service.impl;

import com.civka.monopoly.api.dto.ChatMessageDto;
import com.civka.monopoly.api.dto.ProjectType;
import com.civka.monopoly.api.entity.*;
import com.civka.monopoly.api.payload.EventMessage;
import com.civka.monopoly.api.payload.PlayerMessage;
import com.civka.monopoly.api.payload.RoomMessage;
import com.civka.monopoly.api.repository.EventRepository;
import com.civka.monopoly.api.repository.MemberRepository;
import com.civka.monopoly.api.service.ChatMessageService;
import com.civka.monopoly.api.service.ChatService;
import com.civka.monopoly.api.service.EventService;
import com.civka.monopoly.api.service.PropertyService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.Comparator;
import java.util.Iterator;
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
    @Transactional
    public Event makeProjectChoice(Member member, ProjectType choice) {
        switch (choice) {
            case BREAD_AND_CIRCUSES -> {
                Room room = member.getRoom();
                Property.Upgrade highestEntertainmentLevel = getHighestDistrictLevel(member, "ENTERTAINMENT");
                List<Member> members = room.getMembers();

                for (Member m : members) {
                    boolean isCurrentMember = m.equals(member);
                    List<Property> properties = m.getProperties();
                    Iterator<Property> iterator = properties.iterator();
                    while (iterator.hasNext()) {
                        Property property = iterator.next();
                        if (property.getMortgage() != -1) {
                            property.setMortgage(property.getMortgage() +
                                    gameUtils.getBreadAndCircusesByLevel(highestEntertainmentLevel, isCurrentMember));
                            propertyService.save(property);
                            if (!isCurrentMember && property.getMortgage() < 1) {
                                iterator.remove();
                            }
                        }
                    }
                    memberRepository.save(m);
                }

                RoomMessage roomMessage = RoomMessage.builder()
                        .type(RoomMessage.MessageType.PROJECTS)
                        .content("Game started")
                        .room(room)
                        .build();
                messagingTemplate.convertAndSend("/topic/public/" + room.getName() + "/game", roomMessage);
            }

            case CAMPUS_RESEARCH_GRANTS -> {

            }

            case COMMERCIAL_HUB_INVESTMENT -> {
                Property.Upgrade highestCommercialHubLevel = getHighestDistrictLevel(member, "COMMERCIAL_HUB");
                AdditionalEffect commercialHubInvestment = AdditionalEffect.builder()
                        .member(member)
                        .type(switch (highestCommercialHubLevel) {
                            case LEVEL_1 -> AdditionalEffect.AdditionalEffectType.COMMERCIAL_HUB_INVESTMENT_1;
                            case LEVEL_2 -> AdditionalEffect.AdditionalEffectType.COMMERCIAL_HUB_INVESTMENT_2;
                            case LEVEL_3 -> AdditionalEffect.AdditionalEffectType.COMMERCIAL_HUB_INVESTMENT_3;
                            case LEVEL_4 -> AdditionalEffect.AdditionalEffectType.COMMERCIAL_HUB_INVESTMENT_4;
                            default -> null;
                        })
                        .turnsLeft(10)
                        .build();
                member.getAdditionalEffects().add(commercialHubInvestment);
                memberRepository.save(member);
            }

            case ENCAMPMENT_TRAINING -> {

            }
            case HARBOR_SHIPPING -> {

            }
            case INDUSTRIAL_ZONE_LOGISTICS -> {

            }
            case THEATER_SQUARE_PERFORMANCES -> {

            }
            case LAUNCH_EARTH_SATELLITE -> {

            }
            case LAUNCH_MOON_LANDING -> {

            }
            case LAUNCH_MARS_COLONY -> {

            }
            case EXOPLANET_EXPEDITION -> {

            }
            case TERRESTRIAL_LASER_STATION -> {

            }
            default -> {

            }
        }
        return delete(member, Event.EventType.PROJECTS);
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
            if (hasDistrictForProjects(member)) {
                add(member, Event.EventType.PROJECTS);
            }
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

    private boolean hasDistrictForProjects(Member member) {
        return member.getProperties().stream()
                .filter(property -> property.getPosition() == 7 ||
                        property.getPosition() == 10 ||
                        property.getPosition() == 15 ||
                        property.getPosition() == 17 ||
                        property.getPosition() == 19 ||
                        property.getPosition() == 21 ||
                        property.getPosition() == 22 ||
                        property.getPosition() == 30 ||
                        property.getPosition() == 31 ||
                        property.getPosition() == 34 ||
                        property.getPosition() == 38 ||
                        property.getPosition() == 39 ||
                        property.getPosition() == 43 ||
                        property.getPosition() == 45 ||
                        property.getPosition() == 47
                )
                .count() >= 3;
    }

    private Property.Upgrade getHighestDistrictLevel(Member member, String districtType) {
        return member.getProperties().stream()
                .filter(property -> switch (districtType) {
                    case "ENTERTAINMENT" -> property.getPosition() == 22 || property.getPosition() == 38;
                    case "CAMPUS" -> property.getPosition() == 15 || property.getPosition() == 45;
                    case "COMMERCIAL_HUB" -> property.getPosition() == 19 || property.getPosition() == 43;
                    default -> false;
                })
                .flatMap(property -> property.getUpgrades().stream())
                .filter(upgrade -> upgrade == Property.Upgrade.LEVEL_1 ||
                        upgrade == Property.Upgrade.LEVEL_2 ||
                        upgrade == Property.Upgrade.LEVEL_3 ||
                        upgrade == Property.Upgrade.LEVEL_4)
                .max(Comparator.comparingInt(upgrade -> switch (upgrade) {
                    case LEVEL_1 -> 1;
                    case LEVEL_2 -> 2;
                    case LEVEL_3 -> 3;
                    case LEVEL_4 -> 4;
                    default -> 0;
                }))
                .orElse(Property.Upgrade.LEVEL_1);
    }
}
