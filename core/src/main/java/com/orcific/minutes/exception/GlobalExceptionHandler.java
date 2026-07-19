package com.orcific.minutes.exception;

import com.orcific.minutes.dto.ApiError;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.LocalDateTime;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<ApiError> handleException(IllegalArgumentException e) {
        ApiError error = new ApiError(
                LocalDateTime.now(),
                HttpStatus.BAD_REQUEST.value(),
                HttpStatus.BAD_REQUEST.getReasonPhrase(),
                e.getMessage()
        );

        return ResponseEntity.badRequest().body(error);
    }

    @ExceptionHandler(InvalidAiResponseException.class)
    public ResponseEntity<ApiError> handleException(InvalidAiResponseException e) {
        ApiError error = new ApiError(
                LocalDateTime.now(),
                HttpStatus.INTERNAL_SERVER_ERROR.value(),
                HttpStatus.INTERNAL_SERVER_ERROR.getReasonPhrase(),
                e.getMessage()
        );

        return ResponseEntity.internalServerError().body(error);
    }

    @ExceptionHandler(OllamaCommunicationException.class)
    public ResponseEntity<ApiError> handleException(OllamaCommunicationException e) {
        ApiError error = new ApiError(
                LocalDateTime.now(),
                HttpStatus.BAD_GATEWAY.value(),
                HttpStatus.BAD_GATEWAY.getReasonPhrase(),
                e.getMessage()
        );

        return ResponseEntity.internalServerError().body(error);
    }
}
