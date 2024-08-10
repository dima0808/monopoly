package com.civka.monopoly.api.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ChatMessageDto {

    private String sender;
    private String content;
    private String receiver;
}
