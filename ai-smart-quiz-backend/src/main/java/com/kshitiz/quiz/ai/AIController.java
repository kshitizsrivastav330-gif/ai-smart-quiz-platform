package com.kshitiz.quiz.ai;

import com.kshitiz.quiz.dto.AiQuestionRequest;
import com.kshitiz.quiz.service.AiService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/ai")
public class AiController {

    private final AiService aiService;

    public AiController(AiService aiService) {
        this.aiService = aiService;
    }

    @PostMapping("/generate")
    public String generate(@RequestBody AiQuestionRequest request) {

        return aiService.generateAndSaveQuestions(request);
    }
}