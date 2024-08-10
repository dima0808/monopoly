package com.civka.monopoly.api.service.impl;

import com.civka.monopoly.api.entity.Civilization;
import com.civka.monopoly.api.entity.Member;
import com.civka.monopoly.api.entity.Room;
import com.civka.monopoly.api.entity.User;
import com.civka.monopoly.api.payload.NotificationResponse;
import com.civka.monopoly.api.repository.RoomRepository;
import com.civka.monopoly.api.service.*;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class RoomServiceImpl implements RoomService {

    private final MemberService memberService;
    @Value("${monopoly.app.room.maxSize}")
    private Integer maxSize;

    private final RoomRepository roomRepository;
    private final UserService userService;
    private final SimpMessagingTemplate messagingTemplate;

    @Override
    public Room create(Room room, String username) {
        if (room.getSize() > maxSize || room.getSize() < 2) {
            throw new IllegalRoomSizeException(room.getSize(), maxSize);
        }
        User user = userService.findByUsername(username);
        if (user.getMember() != null) {
            throw new UserAlreadyJoinedException(username);
        }
        roomRepository.save(room);
        return addMember(room, username);
    }

    @Override
    public Room findById(Long roomId) {
        return roomRepository.findById(roomId)
                .orElseThrow(() -> new RoomNotFoundException(roomId));
    }

    @Override
    public List<Room> findAll() {
        return roomRepository.findAll();
    }

    @Override
    public Room deleteById(Long roomId, String username) {
        Room room = findById(roomId);
        Member leader = userService.findByUsername(username).getMember();
        if (leader == null || !leader.getIsLeader() || !leader.getRoom().getId().equals(roomId)) {
            throw new UserNotAllowedException();
        }
        for (Member temp : room.getMembers()) {
            temp.getUser().setMember(null);
            userService.update(temp.getUser());
            memberService.deleteById(temp.getId());
        }
        roomRepository.deleteById(roomId);
        NotificationResponse notificationResponse = NotificationResponse.builder()
                .timestamp(LocalDateTime.now())
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
        if (user.getMember() != null) throw new UserAlreadyJoinedException(username);
        if (room.getMembers().size() == room.getSize()) throw new RoomFullException(room.getId(), room.getSize());
        List<Member> members = room.getMembers();
        Member member = Member.builder()
                .user(user)
                .room(room)
                .isLeader(members.isEmpty())
                .civilization(Civilization.RANDOM)
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
                }
                return updatedRoom;
            }
        }
        throw new UserNotJoinedException(username);
    }

    @Override
    public Room addMember(Long roomId, String username) {
        return addMember(findById(roomId), username);
    }

    @Override
    public Room removeMember(Long roomId, String username) {
        return removeMember(findById(roomId), username);
    }

    @Override
    public Room kickMember(Long roomId, String member, String username) {
        Member leader = userService.findByUsername(username).getMember();
        if (leader == null || !leader.getIsLeader() || !leader.getRoom().getId().equals(roomId)) {
            throw new UserNotAllowedException();
        }
        Room updatedRoom = removeMember(roomId, member);
        NotificationResponse notificationResponse = NotificationResponse.builder()
                .timestamp(LocalDateTime.now())
                .message("You were kicked from the room by " + username)
                .build();
        messagingTemplate.convertAndSendToUser(member, "/queue/notifications", notificationResponse);
        return updatedRoom;
    }

    @Override
    public void handlePassword(Long roomId, String password) {
        Room room = findById(roomId);
        if (!room.getPassword().equals(password)) {
            throw new WrongLobbyPasswordException();
        }
    }
}
