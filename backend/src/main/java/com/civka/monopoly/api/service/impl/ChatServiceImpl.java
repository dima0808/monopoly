package com.civka.monopoly.api.service.impl;

import com.civka.monopoly.api.dto.ChatMessageDto;
import com.civka.monopoly.api.entity.Chat;
import com.civka.monopoly.api.entity.ChatMessage;
import com.civka.monopoly.api.entity.User;
import com.civka.monopoly.api.repository.ChatRepository;
import com.civka.monopoly.api.service.*;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ChatServiceImpl implements ChatService {

    private final ChatMessageService chatMessageService;
    private final UserService userService;
    private final ChatRepository chatRepository;
    private final SimpMessagingTemplate messagingTemplate;

    @Override
    public Chat findByName(String name) {
        return chatRepository.findByName(name)
                .orElseThrow(() -> new ChatNotFoundException(name));
    }

    @Override
    public Chat save(Chat chat) {
        return chatRepository.save(chat);
    }

    @Override
    public ChatMessage sendPublicMessage(String chatName, ChatMessageDto chatMessageDto) {
        Chat chat = findByName(chatName);
        return chatMessageService.save(chat, chatMessageDto);
    }

    @Override
    public ChatMessage sendPrivateMessage(String chatName, ChatMessageDto chatMessageDto) {
        Chat chat = findByName(chatName);
        ChatMessage chatMessage = chatMessageService.save(chat, chatMessageDto);
        messagingTemplate.convertAndSendToUser(chatMessage.getReceiver(), "/topic/chat/" + chat.getName(), chatMessage);
        messagingTemplate.convertAndSendToUser(chatMessage.getSender(), "/topic/chat/" + chat.getName(), chatMessage);
        return chatMessage;
    }

    @Override
    public void clearMessages(String chatName, String admin) {
        User adminUser = userService.findByUsername(admin);
        if (adminUser.getRoles().stream().anyMatch(role -> role.getName().equals("ROLE_ADMIN"))) {
            Chat chat = findByName(chatName);
            chat.getMessages().clear();
            chatRepository.save(chat);
        } else {
            throw new UserNotAllowedException();
        }
    }

    @Override
    public void clearMessages(Integer clearCount, String chatName, String admin) {
        if (clearCount < 1) {
            throw new InvalidCommandException();
        }
        User adminUser = userService.findByUsername(admin);
        if (adminUser.getRoles().stream().anyMatch(role -> role.getName().equals("ROLE_ADMIN"))) {
            Chat chat = findByName(chatName);
            int size = chat.getMessages().size();
            for (int i = 0; i < clearCount && size > 0; i++) {
                chat.getMessages().remove(size - 1);
                size--;
            }
            chatRepository.save(chat);
        } else {
            throw new UserNotAllowedException();
        }
    }
}
