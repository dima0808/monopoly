package com.civka.monopoly.api.controller;

import com.civka.monopoly.api.payload.ChatMessageResponse;
import com.civka.monopoly.api.service.ChatService;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
@RequiredArgsConstructor
public class CommandController {

    private final ChatService chatService;

    @MessageMapping("/chat/clear/{name}")
    @SendTo("/topic/chat")
    public ChatMessageResponse clearMessages(@Header("username") String admin, @DestinationVariable String name) {
        chatService.clearMessages(name, admin);
        return ChatMessageResponse.builder()
                .type(ChatMessageResponse.MessageType.CLEAR)
                .content("Chat cleared by " + admin)
                .build();
    }
}
