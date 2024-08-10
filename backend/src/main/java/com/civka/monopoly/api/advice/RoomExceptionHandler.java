package com.civka.monopoly.api.advice;

import com.civka.monopoly.api.payload.ErrorResponse;
import com.civka.monopoly.api.service.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.messaging.handler.annotation.MessageExceptionHandler;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ControllerAdvice;

import java.time.LocalDateTime;

@ControllerAdvice
@Controller
@RequiredArgsConstructor
public class RoomExceptionHandler {

    private final SimpMessagingTemplate messagingTemplate;

    @MessageExceptionHandler({UserAlreadyJoinedException.class, RoomNotFoundException.class,
            UserNotAllowedException.class, IllegalRoomSizeException.class, RoomFullException.class,
            WrongLobbyPasswordException.class})
    public ErrorResponse handleException(RuntimeException exc, @Header("username") String username) {

        ErrorResponse errorResponse = ErrorResponse.builder()
                .timestamp(LocalDateTime.now())
                .status(getErrorHttpStatus(exc).value())
                .message(exc.getMessage())
                .build();

        messagingTemplate.convertAndSendToUser(username, "/queue/errors", errorResponse);

        return errorResponse;
    }

    private static HttpStatus getErrorHttpStatus(RuntimeException exc) {
        HttpStatus status;
        if (exc instanceof UserAlreadyJoinedException ||
                exc instanceof IllegalRoomSizeException ||
                exc instanceof RoomFullException) {
            status = HttpStatus.BAD_REQUEST;
        } else if (exc instanceof RoomNotFoundException) {
            status = HttpStatus.NOT_FOUND;
        } else if (exc instanceof UserNotAllowedException || exc instanceof WrongLobbyPasswordException) {
            status = HttpStatus.FORBIDDEN;
        } else {
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }
        return status;
    }
}
