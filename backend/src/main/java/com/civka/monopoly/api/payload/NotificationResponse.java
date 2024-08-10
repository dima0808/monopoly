package com.civka.monopoly.api.payload;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@AllArgsConstructor
@Getter
@Setter
@Builder
public class NotificationResponse {

    private LocalDateTime timestamp;
    private String message;
}