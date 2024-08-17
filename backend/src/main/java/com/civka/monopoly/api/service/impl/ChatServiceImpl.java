package com.civka.monopoly.api.service.impl;

import com.civka.monopoly.api.dto.ChatMessageDto;
import com.civka.monopoly.api.dto.ContactDto;
import com.civka.monopoly.api.entity.Chat;
import com.civka.monopoly.api.entity.ChatMessage;
import com.civka.monopoly.api.entity.User;
import com.civka.monopoly.api.payload.NotificationResponse;
import com.civka.monopoly.api.repository.ChatRepository;
import com.civka.monopoly.api.service.*;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ChatServiceImpl implements ChatService {

    private final ChatMessageService chatMessageService;
    private final UserService userService;
    private final ChatRepository chatRepository;
    private final SimpMessagingTemplate messagingTemplate;

    @Override
    public Chat findByName(String chatName) {
        return chatRepository.findByName(chatName)
                .orElseThrow(() -> new ChatNotFoundException(chatName));
    }

    @Override
    public Chat findPrivateChatByName(String chatName) {
        return chatRepository.findByName(chatName)
                .orElseThrow(() -> new ChatNotFoundException(chatName));
    }

    @Override
    public List<Chat> findAllByUsername(String username) {
        return chatRepository.findAllByUsername(username);
    }

    @Override
    public List<ContactDto> getUserContacts(String username) {
        List<Chat> chats = findAllByUsername(username);
        List<ContactDto> contacts = new ArrayList<>();

        for (Chat chat : chats) {
            if (!chat.getMessages().isEmpty()) {
                ChatMessage lastMessage = chat.getMessages().get(chat.getMessages().size() - 1);
                User user = userService.findByUsername(chat.getName().replace(username, "").trim());
                ChatMessageDto lastMessageDto = ChatMessageDto.builder()
                        .sender((lastMessage.getSender().getUsername()))
                        .receiver(lastMessage.getReceiver().getUsername())
                        .content(lastMessage.getContent())
                        .timestamp(lastMessage.getTimestamp())
                        .build();
                contacts.add(new ContactDto(user.getNickname(), lastMessageDto));
            }
        }

        return contacts;
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
        Chat chat = findPrivateChatByName(chatName);
        ChatMessage chatMessage = chatMessageService.save(chat, chatMessageDto);
        messagingTemplate.convertAndSendToUser(chatMessage.getReceiver().getUsername(), "/chat/private/" + chatMessage.getSender().getUsername(), chatMessage);
        messagingTemplate.convertAndSendToUser(chatMessage.getSender().getUsername(), "/chat/private/" + chatMessage.getReceiver().getUsername(), chatMessage);
        NotificationResponse notificationResponse = NotificationResponse.builder()
                .timestamp(LocalDateTime.now())
                .type(NotificationResponse.NotificationType.MESSAGE)
                .sender(chatMessage.getSender().getNickname())
                .message(chatMessage.getContent())
                .build();
        messagingTemplate.convertAndSendToUser(chatMessage.getReceiver().getUsername(), "/queue/notifications", notificationResponse);
        ContactDto contactDtoForReceiver = new ContactDto(chatMessage.getSender().getNickname(), chatMessageDto);
        ContactDto contactDtoForSender = new ContactDto(chatMessage.getReceiver().getNickname(), chatMessageDto);
        messagingTemplate.convertAndSendToUser(chatMessage.getReceiver().getUsername(), "/chat/contacts", contactDtoForReceiver);
        messagingTemplate.convertAndSendToUser(chatMessage.getSender().getUsername(), "/chat/contacts", contactDtoForSender);
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
