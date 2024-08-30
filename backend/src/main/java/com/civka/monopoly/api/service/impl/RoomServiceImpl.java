package com.civka.monopoly.api.service.impl;

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
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Random;

@Service
@RequiredArgsConstructor
@Transactional
public class RoomServiceImpl implements RoomService {

    @Value("${monopoly.app.room.max-size}")
    private Integer maxRoomSize;

    @Value("${monopoly.app.room.game.init-gold}")
    private Integer initGold;

    @Value("${monopoly.app.room.game.init-strength}")
    private Integer initStrength;

    private final RoomRepository roomRepository;
    private final UserService userService;
    private final MemberService memberService;
    private final ChatService chatService;
    private final PropertyService propertyService;
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
                .filter(civ -> !chosenCivilizations.contains(civ))
                .toList());
        for (Member member : members) {
            member.setGold(initGold);
            member.setStrength(initStrength);
            member.setTourism(0);
            member.setScore(0);
            member.setHasRolledDice(true);
            if (member.getCivilization() == Member.Civilization.Random) {
                Member.Civilization randomCivilization = availableCivilizations.remove((int) (Math.random() * availableCivilizations.size()));
                member.setCivilization(randomCivilization);
            }
            memberService.save(member);
        }

        Random random = new Random();
        Member randomMember = members.get(random.nextInt(members.size()));
        randomMember.setHasRolledDice(false);
        room.setCurrentTurn(randomMember.getUser().getUsername());
        memberService.save(randomMember);
        return roomRepository.save(room);
    }

    @Override
    public Room endTurn(Member member) {
        if (!member.getRoom().getCurrentTurn().equals(member.getUser().getUsername()) || !member.getHasRolledDice()) {
            throw new UserNotAllowedException();
        }
        Room room = member.getRoom();
        List<Member> members = room.getMembers();
        int currentIndex = members.indexOf(member);
        int nextIndex = (currentIndex + 1) % members.size();
        Member nextMember = members.get(nextIndex);
        nextMember.setHasRolledDice(false);
        room.setCurrentTurn(nextMember.getUser().getUsername());
        memberService.save(nextMember);
        return roomRepository.save(room);
    }

    @Override
    public Property buyProperty(Member member, Integer position) {
        if (!member.getPosition().equals(position) ||
                propertyService.existsByRoomAndPosition(member.getRoom(), position)) {
            throw new UserNotAllowedException();
        }
        Room room = member.getRoom();
        Property property = Property.builder()
                .member(member)
                .room(room)
                .upgradeLevel(List.of(Property.Upgrade.LEVEL_1))
                .position(position)
                .build();
        return propertyService.save(property);
    }
}
