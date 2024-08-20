package com.civka.monopoly.api.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
public class ChatMessageDto {

    private String sender;
    private String content;
    private String receiver;
    LocalDateTime timestamp;
}
