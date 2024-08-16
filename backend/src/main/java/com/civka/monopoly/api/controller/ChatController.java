package com.civka.monopoly.api.controller;

import com.civka.monopoly.api.dto.ChatMessageDto;
import com.civka.monopoly.api.entity.ChatMessage;
import com.civka.monopoly.api.service.ChatService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.*;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

@Controller
@RequiredArgsConstructor
public class ChatController {

    private final ChatService chatService;

    @MessageMapping("/chat/sendPublicMessage/{chatName}")
    @SendTo("/topic/chat/{chatName}")
    public ChatMessage sendMessage(@Payload ChatMessageDto chatMessageDto,
                                   @Header("username") String username,
                                   @DestinationVariable String chatName) {
        chatMessageDto.setSender(username);
        return chatService.sendPublicMessage(chatName, chatMessageDto);
    }

    @MessageMapping("/chat/sendPrivateMessage/{chatName}")
    @SendTo("/topic/chat/{chatName}")
    public ChatMessage sendPrivateMessage(@Payload ChatMessageDto chatMessageDto,
                                          @Header("username") String username,
                                          @DestinationVariable String chatName) {
        chatMessageDto.setSender(username);
        chatMessageDto.setReceiver(chatName.replace(username, "").trim());
        return chatService.sendPrivateMessage(chatName, chatMessageDto);
    }

    @GetMapping("/api/chat/{chatName}")
    public ResponseEntity<List<ChatMessage>> getAllChatMessages(@PathVariable String chatName) {
        return ResponseEntity.ok(chatService.findByName(chatName).getMessages());
    }

    @GetMapping("/api/chat/private/{chatName}")
    public ResponseEntity<List<ChatMessage>> getAllPrivateChatMessages(@PathVariable String chatName) {
        return ResponseEntity.ok(chatService.findPrivateChatByName(chatName).getMessages());
    }
}
