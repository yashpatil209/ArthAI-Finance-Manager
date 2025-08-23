package com.Finance.Backend.config;


import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {
    public WebConfig() {
    }

    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**").allowedOrigins(new String[]{"http://localhost:5173", "https://main.d38bktb3mml044.amplifyapp.com/"}).allowedMethods(new String[]{"GET", "POST", "PUT", "DELETE"}).allowedHeaders(new String[]{"*"}).allowCredentials(true).maxAge(3600L);
    }
}
