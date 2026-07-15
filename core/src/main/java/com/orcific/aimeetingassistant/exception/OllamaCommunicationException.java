package com.orcific.aimeetingassistant.exception;

public class OllamaCommunicationException extends RuntimeException {
    public OllamaCommunicationException(String message) {
        super(message);
    }

    public OllamaCommunicationException(String message, Throwable cause) {
        super(message, cause);
    }
}
