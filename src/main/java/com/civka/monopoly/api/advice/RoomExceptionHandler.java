package com.civka.monopoly.api.advice;

import com.civka.monopoly.api.payload.ErrorResponse;
import com.civka.monopoly.api.service.RoomNotFoundException;
import com.civka.monopoly.api.service.UserAlreadyJoinedException;
import org.springframework.http.HttpStatus;
import org.springframework.messaging.handler.annotation.MessageExceptionHandler;
import org.springframework.messaging.simp.annotation.SendToUser;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ControllerAdvice;

import java.time.LocalDateTime;

@ControllerAdvice
@Controller
public class RoomExceptionHandler {

    @MessageExceptionHandler
    @SendToUser("/queue/errors")
    public ErrorResponse handleException(UserAlreadyJoinedException exc) {
        return ErrorResponse.builder()
                .timestamp(LocalDateTime.now())
                .status(HttpStatus.BAD_REQUEST.value())
                .message(exc.getMessage())
                .build();
    }

    @MessageExceptionHandler
    @SendToUser("/queue/errors")
    public ErrorResponse handleException(RoomNotFoundException exc) {
        return ErrorResponse.builder()
                .timestamp(LocalDateTime.now())
                .status(HttpStatus.NOT_FOUND.value())
                .message(exc.getMessage())
                .build();
    }
}
