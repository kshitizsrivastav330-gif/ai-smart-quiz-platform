package com.kshitiz.quiz.ai;

import com.kshitiz.quiz.dto.AIQuestionRequest;
import com.kshitiz.quiz.dto.AISaveRequest;
import com.kshitiz.quiz.entity.Category;
import com.kshitiz.quiz.repository.CategoryRepository;
import com.kshitiz.quiz.service.AIService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/ai")
@CrossOrigin(origins = "http://localhost:5173")
public class AIController {

    private final GroqService groqService;
    private final AIService aiService;
    private final CategoryRepository categoryRepository;

    public AIController(GroqService groqService,
                        AIService aiService,
                        CategoryRepository categoryRepository) {

        this.groqService = groqService;
        this.aiService = aiService;
        this.categoryRepository = categoryRepository;
    }

    @PostMapping("/generate")
    public String generate(@RequestBody AIQuestionRequest request) {

        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Category Not Found"));

        return groqService.generateQuestions(
                category.getName(),
                request.getDifficulty(),
                request.getNumberOfQuestions()
        );
    }

    @PostMapping("/save")
    public String save(@RequestBody AISaveRequest request) {

        return aiService.saveQuestions(request);

    }

}