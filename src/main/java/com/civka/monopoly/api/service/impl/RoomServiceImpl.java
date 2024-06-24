package com.civka.monopoly.api.service.impl;

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
        if (user.getRoom() != null) {
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
        if (!room.getMembers().get(0).getUsername().equals(username)) {
            throw new UserNotAllowedException();
        }
        for (User user : room.getMembers()) {
            user.setRoom(null);
            userService.update(user);
        }
        roomRepository.deleteById(roomId);
    }

    @Override
    public Room addMember(Room room, String username) {
        User user = userService.findByUsername(username);
        if (user.getRoom() != null) throw new UserAlreadyJoinedException(username);
        if (room.getMembers().size() == room.getSize()) throw new RoomFullException(room.getId(), room.getSize());
        List<User> members = room.getMembers();
        for (User temp : members) {
            if (temp.getUsername().equals(username)) throw new UserAlreadyJoinedException(username);
        }
        members.add(user);
        room.setMembers(members);
        user.setRoom(room);
        userService.update(user);
        return roomRepository.save(room);
    }

    @Override
    public Room removeMember(Room room, String username) {
        User user = userService.findByUsername(username);
        List<User> members = room.getMembers();
        for (User temp : members) {
            if (temp.getUsername().equals(username)) {
                members.remove(temp);
                room.setMembers(members);
                user.setRoom(null);
                userService.update(user);
                if (members.isEmpty()) {
                    roomRepository.deleteById(room.getId());
                    return null;
                }
                return roomRepository.save(room);
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
        if (username.equals(findById(roomId).getMembers().get(0).getUsername())) {
            return removeMember(roomId, member);
        } else {
            throw new UserNotAllowedException();
        }
    }
}
