package com.hangukstep;

import io.github.cdimascio.dotenv.Dotenv;
import io.github.cdimascio.dotenv.DotenvException;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class HangukStepApplication {

    public static void main(String[] args) {
        // Load .env file
        try {
            Dotenv dotenv = Dotenv.configure()
                    .ignoreIfMissing()
                    .load();

            // Set environment variables from .env file
            dotenv.entries().forEach(entry -> {
                String envValue = System.getenv(entry.getKey());
                if (envValue == null) {
                    System.setProperty(entry.getKey(), entry.getValue());
                }
            });

            System.out.println("Loaded .env file successfully");
        } catch (DotenvException e) {
            System.out.println("No .env file found, using system environment variables");
        }

        SpringApplication.run(HangukStepApplication.class, args);
    }
}
