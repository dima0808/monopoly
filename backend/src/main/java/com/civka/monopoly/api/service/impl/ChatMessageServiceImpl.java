package com.civka.monopoly.api.service.impl;

import com.civka.monopoly.api.dto.ChatMessageDto;
import com.civka.monopoly.api.entity.Chat;
import com.civka.monopoly.api.entity.ChatMessage;
import com.civka.monopoly.api.repository.ChatMessageRepository;
import com.civka.monopoly.api.repository.ChatRepository;
import com.civka.monopoly.api.service.ChatMessageService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class ChatMessageServiceImpl implements ChatMessageService {

    private final ChatMessageRepository chatMessageRepository;
    private final ChatRepository chatRepository;

    @Value("${monopoly.app.chat.max-size}")
    private Integer maxSize;

    @Override
    public ChatMessage save(Chat chat, ChatMessageDto chatMessageDto) {
        ChatMessage chatMessage = ChatMessage.builder()
                .sender(chatMessageDto.getSender())
                .content(chatMessageDto.getContent())
                .timestamp(LocalDateTime.now())
                .receiver(chatMessageDto.getReceiver())
                .chat(chat)
                .build();

        chat.getMessages().add(chatMessage);
        if (chat.getMessages().size() > maxSize) {
            chat.getMessages().remove(0);
        }

        chatRepository.save(chat);
        return chatMessage;
    }
}