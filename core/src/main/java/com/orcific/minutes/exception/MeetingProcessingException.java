package com.orcific.minutes.exception;

public class MeetingProcessingException extends RuntimeException {
    public  MeetingProcessingException(String message) {
        super(message);
    }
    public  MeetingProcessingException(String message, Throwable cause) {
        super(message, cause);
    }
}
