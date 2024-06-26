package com.civka.monopoly.api.service.impl;

import com.civka.monopoly.api.entity.Civilization;
import com.civka.monopoly.api.entity.Member;
import com.civka.monopoly.api.entity.Room;
import com.civka.monopoly.api.entity.User;
import com.civka.monopoly.api.repository.RoomRepository;
import com.civka.monopoly.api.service.*;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RoomServiceImpl implements RoomService {

    private final MemberService memberService;
    @Value("${monopoly.app.room.maxSize}")
    private Integer maxSize;

    private final RoomRepository roomRepository;
    private final UserService userService;

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
    public void deleteById(Long roomId, String username) {
        Room room = findById(roomId);
        if (!room.getMembers().get(0).getUser().getUsername().equals(username)) {
            throw new UserNotAllowedException();
        }
        for (Member temp : room.getMembers()) {
            temp.getUser().setMember(null);
            userService.update(temp.getUser());
            memberService.delete(temp);
        }
        roomRepository.deleteById(roomId);
    }

    @Override
    public Room addMember(Room room, String username) {
        User user = userService.findByUsername(username);
        if (user.getMember() != null) throw new UserAlreadyJoinedException(username);
        if (room.getMembers().size() == room.getSize()) throw new RoomFullException(room.getId(), room.getSize());
        List<Member> members = room.getMembers();
        for (Member temp : members) {
            if (temp.getUser().getUsername().equals(username)) throw new UserAlreadyJoinedException(username);
        }

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
                room.setMembers(members);
                user.setMember(null);
                if (temp.getIsLeader() && members.size() > 1) {
                    members.get(1).setIsLeader(true);
                }
                userService.update(user);
                Room updatedRoom = roomRepository.save(room);
                memberService.delete(temp);
                if (members.isEmpty()) {
                    roomRepository.deleteById(room.getId());
                    return null;
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
        if (username.equals(findById(roomId).getMembers().get(0).getUser().getUsername())) {
            return removeMember(roomId, member);
        } else {
            throw new UserNotAllowedException();
        }
    }
}
