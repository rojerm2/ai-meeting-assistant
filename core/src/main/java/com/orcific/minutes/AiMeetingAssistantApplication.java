package com.orcific.minutes;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.ConfigurationPropertiesScan;

@SpringBootApplication
@ConfigurationPropertiesScan
public class AiMeetingAssistantApplication {

    public static void main(String[] args) {
        SpringApplication.run(AiMeetingAssistantApplication.class, args);
    }

}
