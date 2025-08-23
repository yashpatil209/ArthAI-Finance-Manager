package com.Finance.Backend.Controller;

import com.Finance.Backend.Service.GeminiAIService;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ChatBotController {
    @Autowired
    private GeminiAIService geminiAIService;

    public ChatBotController() {
    }

    @PostMapping({"/chatbot/ask"})
    public ResponseEntity<String> processText(@RequestBody Map<String, String> request) {
        String prompt = (String)request.get("question");
        String response = this.geminiAIService.processPrompt(prompt);
        return ResponseEntity.ok(response);
    }
}

