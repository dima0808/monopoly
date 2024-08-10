package com.civka.monopoly.api.service;

import com.civka.monopoly.api.dto.ChatMessageDto;
import com.civka.monopoly.api.entity.Chat;
import com.civka.monopoly.api.entity.ChatMessage;

public interface ChatService {

    ChatMessage sendPublicMessage(String name, ChatMessageDto chatMessageDto);

    ChatMessage sendPrivateMessage(String name, ChatMessageDto chatMessageDto);

    Chat findByName(String name);

    void clearMessages(String name, String admin);

    Chat save(Chat chat);
}
