package com.civka.monopoly.api.service.impl;

import com.civka.monopoly.api.entity.Room;
import com.civka.monopoly.api.entity.User;
import com.civka.monopoly.api.repository.RoomRepository;
import com.civka.monopoly.api.service.RoomNotFoundException;
import com.civka.monopoly.api.service.RoomService;
import com.civka.monopoly.api.service.UserAlreadyJoinedException;
import com.civka.monopoly.api.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RoomServiceImpl implements RoomService {

    private final RoomRepository roomRepository;
    private final UserService userService;

    @Override
    public Room create(Room room, String username) {
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
    public void deleteById(Long roomId) {
        roomRepository.deleteById(roomId);
    }

    @Override
    public Room addMember(Room room, String username) {
        User user = userService.findByUsername(username);
        List<User> members = room.getMembers();
        for (User temp : members) {
            if (temp.getUsername().equals(username)) throw new UserAlreadyJoinedException(username);
        }
        members.add(user);
        room.setMembers(members);
        return roomRepository.save(room);
    }

    @Override
    public Room addMember(Long roomId, String username) {
        return addMember(findById(roomId), username);
    }
}
