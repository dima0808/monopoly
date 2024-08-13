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

    @MessageMapping("/chat/sendPublicMessage/{name}")
    @SendTo("/topic/chat/{name}")
    public ChatMessage sendMessage(@Payload ChatMessageDto chatMessageDto,
                                   @Header("username") String username,
                                   @DestinationVariable String name) {
        chatMessageDto.setSender(username);
        return chatService.sendPublicMessage(name, chatMessageDto);
    }

    @MessageMapping("/chat/sendPrivateMessage/{name}")
    public ChatMessage sendPrivateMessage(@Payload ChatMessageDto chatMessageDto,
                                          @Header("username") String username,
                                          @DestinationVariable String name) {
        chatMessageDto.setSender(username);
        return chatService.sendPrivateMessage(name, chatMessageDto);
    }

    @GetMapping("/api/chat/{name}")
    public ResponseEntity<List<ChatMessage>> getAllRoomMessages(@PathVariable String name) {
        return ResponseEntity.ok(chatService.findByName(name).getMessages());
    }
}
