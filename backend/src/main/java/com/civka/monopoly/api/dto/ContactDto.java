package com.civka.monopoly.api.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Getter
@Setter
public class ContactDto {

    private String nickname;
    private ChatMessageDto lastMessage;
}