package com.civka.monopoly.api.service;

import com.civka.monopoly.api.dto.ChatMessageDto;
import com.civka.monopoly.api.entity.Chat;
import com.civka.monopoly.api.entity.ChatMessage;

public interface ChatService {

    Chat findByName(String name);

    Chat save(Chat chat);

    ChatMessage sendPublicMessage(String chatName, ChatMessageDto chatMessageDto);

    ChatMessage sendPrivateMessage(String chatName, ChatMessageDto chatMessageDto);

    void clearMessages(String chatName, String admin);

    void clearMessages(Integer clearCount, String chatName, String admin);
}
