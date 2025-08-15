package com.Finance.Backend.Controller;

import com.Finance.Backend.Service.GeminiAIService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
public class ChatBotController {

    @Autowired
    private GeminiAIService geminiAIService;

    @PostMapping("/chatbot/ask")
    public ResponseEntity<String> processText(@RequestBody Map<String, String> request) {
        String prompt = request.get("question");

        String response = geminiAIService.processPrompt(prompt);
        return ResponseEntity.ok(response);
    }
}
