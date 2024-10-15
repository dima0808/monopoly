package com.civka.monopoly.api.service.impl;

import com.civka.monopoly.api.dto.GameSettingsDto;
import com.civka.monopoly.api.dto.RoomDto;
import com.civka.monopoly.api.entity.*;
import com.civka.monopoly.api.payload.NotificationResponse;
import com.civka.monopoly.api.repository.RoomRepository;
import com.civka.monopoly.api.service.*;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;

@Service
@RequiredArgsConstructor
@Transactional
public class RoomServiceImpl implements RoomService {

    private final GameUtils gameUtils;
    private final PropertyService propertyService;
    private final EventServiceImpl eventService;
    @Value("${monopoly.app.room.max-size}")
    private Integer maxRoomSize;

    @Value("${monopoly.app.room.game.init-gold}")
    private Integer initGold;

    @Value("${monopoly.app.room.game.init-additional-gold}")
    private Integer initAdditionalGold;

    @Value("${monopoly.app.room.game.init-strength}")
    private Integer initStrength;

    @Value("${monopoly.app.room.game.demoteGoldCoefficient}")
    private Double demoteGoldCoefficient;

    @Value("${monopoly.app.room.game.mortgageGoldCoefficient}")
    private Double mortgageGoldCoefficient;

    @Value("${monopoly.app.room.game.redemptionCoefficient}")
    private Double redemptionCoefficient;

    private final RoomRepository roomRepository;
    private final UserService userService;
    private final MemberService memberService;
    private final ChatService chatService;
    private final SimpMessagingTemplate messagingTemplate;
    private final PasswordEncoder passwordEncoder;

    @Override
    public Room create(RoomDto roomDto, String username) {
        if (roomRepository.existsByName(roomDto.getName())) {
            throw new RoomAlreadyExistException(roomDto.getName());
        }
        if (roomDto.getSize() > maxRoomSize || roomDto.getSize() < 2) {
            throw new IllegalRoomSizeException(roomDto.getSize(), maxRoomSize);
        }
        User user = userService.findByUsername(username);
        if (user.getMember() != null) {
            throw new UserAlreadyJoinedException(username);
        }
        Room room = Room.builder()
                .name(roomDto.getName())
                .size(roomDto.getSize())
                .password(roomDto.getPassword() == null ? null : passwordEncoder.encode(roomDto.getPassword()))
                .members(new ArrayList<>())
                .isStarted(false)
                .turn(1)
                .build();
        roomRepository.save(room);
        chatService.create(room.getName(), true);
        return addMember(room, username);
    }

    @Override
    public Room findByName(String roomName) {
        return roomRepository.findByName(roomName)
                .orElseThrow(() -> new RoomNotFoundException(roomName));
    }

    @Override
    public List<Room> findAll() {
        return roomRepository.findAll();
    }

    @Override
    public Room deleteByName(String roomName, String username) {
        Room room = findByName(roomName);
        Member leader = userService.findByUsername(username).getMember();
        if (leader == null || !leader.getIsLeader() || !leader.getRoom().getName().equals(roomName)) {
            throw new UserNotAllowedException();
        }
        for (Member temp : room.getMembers()) {
            temp.getUser().setMember(null);
            userService.update(temp.getUser());
            memberService.deleteById(temp.getId());
        }
        roomRepository.deleteById(room.getId());
        chatService.deleteByName(room.getName());
        NotificationResponse notificationResponse = NotificationResponse.builder()
                .timestamp(LocalDateTime.now())
                .type(NotificationResponse.NotificationType.DELETE)
                .message("Room " + room.getName() + " was deleted and you were kicked out")
                .build();
        for (Member temp : room.getMembers()) {
            String tempUsername = temp.getUser().getUsername();
            if (!tempUsername.equals(username)) {
                messagingTemplate.convertAndSendToUser(tempUsername, "/queue/notifications", notificationResponse);
            }
        }
        room.setMembers(new ArrayList<>());
        return room;
    }

    @Override
    public Room addMember(Room room, String username) {
        User user = userService.findByUsername(username);
        List<Member> members = room.getMembers();
        if (user.getMember() != null) throw new UserAlreadyJoinedException(username);
        if (members.size() == room.getSize()) throw new RoomFullException(room.getId(), room.getSize());
        List<Member.Color> allColors = Arrays.asList(Member.Color.values());
        List<Member.Color> chosenColors = members.stream()
                .map(Member::getColor)
                .toList();
        Member.Color availableColor = allColors.stream()
                .filter(civ -> !chosenColors.contains(civ))
                .findFirst()
                .orElse(Member.Color.turquoise);
        Member member = Member.builder()
                .user(user)
                .room(room)
                .isLeader(members.isEmpty())
                .civilization(Member.Civilization.Random)
                .color(availableColor)
                .position(0)
                .gold(0)
                .strength(0)
                .tourism(0)
                .build();
        member = memberService.save(member);
        members.add(member);
        user.setMember(member);
        room.setMembers(members);
        userService.update(user);
        return roomRepository.save(room);
    }

    @Override
    public Room removeMember(Room room, String username) {
        User user = userService.findByUsername(username);
        List<Member> members = room.getMembers();
        for (Member temp : members) {
            if (temp.getUser().getUsername().equals(username)) {
                members.remove(temp);
                if (temp.getIsLeader() && !members.isEmpty()) {
                    Member newLeader = members.get(0);
                    newLeader.setIsLeader(true);
                    members.set(0, newLeader);
                    memberService.save(newLeader);
                }
                room.setMembers(members);
                user.setMember(null);
                userService.update(user);
                Room updatedRoom = roomRepository.save(room);
                memberService.deleteById(temp.getId());
                if (members.isEmpty()) {
                    roomRepository.deleteById(room.getId());
                    chatService.deleteByName(room.getName());
                }
                return updatedRoom;
            }
        }
        throw new UserNotJoinedException(username);
    }

    @Override
    public Room addMember(String roomName, String username) {
        return addMember(findByName(roomName), username);
    }

    @Override
    public Room removeMember(String roomName, String username) {
        return removeMember(findByName(roomName), username);
    }

    @Override
    public Room kickMember(String roomName, String member, String username) {
        Member leader = userService.findByUsername(username).getMember();
        if (leader == null || !leader.getIsLeader() || !leader.getRoom().getName().equals(roomName)) {
            throw new UserNotAllowedException();
        }
        Room updatedRoom = removeMember(roomName, member);
        NotificationResponse notificationResponse = NotificationResponse.builder()
                .timestamp(LocalDateTime.now())
                .type(NotificationResponse.NotificationType.KICK)
                .message("You were kicked from the room by " + username)
                .build();
        messagingTemplate.convertAndSendToUser(member, "/queue/notifications", notificationResponse);
        return updatedRoom;
    }

    @Override
    public void handlePassword(String roomName, String password) {
        Room room = findByName(roomName);
        if (!passwordEncoder.matches(password, room.getPassword())) {
            throw new WrongLobbyPasswordException();
        }
    }

    @Override
    public Room startGame(String roomName, String username) {
        Member leader = userService.findByUsername(username).getMember();
        if (leader == null || !leader.getIsLeader() || !leader.getRoom().getName().equals(roomName)) {
            throw new UserNotAllowedException();
        }
        Room room = findByName(roomName);
        room.setIsStarted(true);

        List<Member> members = room.getMembers();
        List<Member.Civilization> allCivilizations = Arrays.asList(Member.Civilization.values());
        List<Member.Civilization> chosenCivilizations = members.stream()
                .map(Member::getCivilization)
                .filter(civ -> civ != Member.Civilization.Random)
                .toList();
        List<Member.Civilization> availableCivilizations = new ArrayList<>(allCivilizations.stream()
                .filter(civ -> !chosenCivilizations.contains(civ) && civ != Member.Civilization.Random)
                .toList());
        for (Member member : members) {
            member.setGold(initGold);
            member.setStrength(initStrength);
            member.setTourism(0);
            member.setScore(0);
            member.setHasRolledDice(true);
            member.setFinishedRounds(0);
            if (member.getCivilization() == Member.Civilization.Random) {
                Member.Civilization randomCivilization = availableCivilizations.remove((int) (Math.random() * availableCivilizations.size()));
                member.setCivilization(randomCivilization);
            }
            memberService.save(member);
        }

        Random random = new Random();
        int randomIndex = random.nextInt(members.size());
        Member randomMember = members.get(randomIndex);
        randomMember.setHasRolledDice(false);
        room.setRandomMemberIndex(randomIndex);
        room.setCurrentTurn(randomMember.getUser().getUsername());
        memberService.save(randomMember);
        int additionalMembers = members.size() - 3;
        for (int i = 1; i <= additionalMembers; i++) {
            Member additionalGoldMember = members.get((randomIndex - i) % members.size());
            additionalGoldMember.setGold(additionalGoldMember.getGold() + initAdditionalGold);
            memberService.save(additionalGoldMember);
        }
        return roomRepository.save(room);
    }

    @Override
    public Room endTurn(Member member, Member.ArmySpending armySpending) {
        if (!member.getRoom().getCurrentTurn().equals(member.getUser().getUsername()) || !member.getHasRolledDice()) {
            throw new UserNotAllowedException();
        }
        if (!member.getEvents().isEmpty()) {
            throw new UserNotAllowedException();
        }
        if (gameUtils.getGoldFromArmySpending(armySpending) > member.getGold()) {
            throw new UserNotAllowedException();
        }
        member.setArmySpending(armySpending);
        member.setStrength(member.getStrength() + gameUtils.getStrengthFromArmySpending(armySpending));
        member.setGold(member.getGold() + gameUtils.getGoldFromArmySpending(armySpending));

        List<Property> properties = member.getProperties();
        Iterator<Property> iterator = properties.iterator();
        while (iterator.hasNext()) {
            Property property = iterator.next();
            if (property.getMortgage() > 0) {
                property.setMortgage(property.getMortgage() - 1);
                propertyService.save(property);
                if (property.getMortgage() == 0) {
                    iterator.remove();
                }
            }
        }
        memberService.save(member);

        Room room = member.getRoom();
        List<Member> members = room.getMembers();
        int currentIndex = members.indexOf(member);
        int nextIndex = (currentIndex + 1) % members.size();
        Member nextMember = members.get(nextIndex);
        nextMember.setHasRolledDice(false);
        room.setCurrentTurn(nextMember.getUser().getUsername());

        if (nextIndex == room.getRandomMemberIndex()) {
            room.setTurn(room.getTurn() + 1);
        }

        memberService.save(nextMember);
        return roomRepository.save(room);
    }

    @Override
    public Room addGold(Member member, Integer gold, String admin) {
        User adminUser = userService.findByUsername(admin);
        if (adminUser.getRoles().stream().anyMatch(role -> role.getName().equals("ROLE_ADMIN"))) {
            member.setGold(member.getGold() + gold);
            return memberService.save(member).getRoom();
        } else {
            throw new UserNotAllowedException();
        }
    }

    @Override
    public Room addStrength(Member member, Integer strength, String admin) {
        User adminUser = userService.findByUsername(admin);
        if (adminUser.getRoles().stream().anyMatch(role -> role.getName().equals("ROLE_ADMIN"))) {
            member.setStrength(member.getStrength() + strength);
            return memberService.save(member).getRoom();
        } else {
            throw new UserNotAllowedException();
        }
    }

    @Override
    public Room addEvent(Member member, Event.EventType eventType, String admin) {
        User adminUser = userService.findByUsername(admin);
        if (adminUser.getRoles().stream().anyMatch(role -> role.getName().equals("ROLE_ADMIN"))) {
            eventService.add(member, eventType);
            return memberService.save(member).getRoom();
        } else {
            throw new UserNotAllowedException();
        }
    }

    @Override
    public Room goToPosition(Member member, Integer position, String admin) {
        User adminUser = userService.findByUsername(admin);
        if (adminUser.getRoles().stream().anyMatch(role -> role.getName().equals("ROLE_ADMIN"))) {
            return eventService.handleBermudaTriangle(member, position);
        } else {
            throw new UserNotAllowedException();
        }
    }

    @Override
    public GameSettingsDto getGameSettings() {
        return GameSettingsDto.builder()
                .armySpendings(gameUtils.getArmySpendings())
                .demoteGoldCoefficient(demoteGoldCoefficient)
                .mortgageGoldCoefficient(mortgageGoldCoefficient)
                .redemptionCoefficient(redemptionCoefficient)
                .build();
    }


}
