package com.civka.monopoly.api.payload;

import com.civka.monopoly.api.entity.Room;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Getter
@Setter
@Builder
public class RoomMessage {

    private MessageType type;
    private String content;
    private Room room;
}
