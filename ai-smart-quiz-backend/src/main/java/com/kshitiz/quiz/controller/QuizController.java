package com.kshitiz.quiz.controller;

import com.kshitiz.quiz.dto.QuestionResponse;
import com.kshitiz.quiz.dto.QuizRequest;
import com.kshitiz.quiz.dto.QuizResultResponse;
import com.kshitiz.quiz.dto.QuizSubmitRequest;
import com.kshitiz.quiz.service.QuizService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/quizzes")
public class QuizController {

    @Autowired
    private QuizService quizService;

    // Create Quiz
    @PostMapping
    public String createQuiz(@RequestBody QuizRequest request) {
        return quizService.createQuiz(request);
    }

    // Start Quiz
    @GetMapping("/{quizId}/start")
    public List<QuestionResponse> startQuiz(@PathVariable Long quizId) {
        return quizService.startQuiz(quizId);
    }

    // Submit Quiz
    @PostMapping("/submit")
    public QuizResultResponse submitQuiz(@RequestBody QuizSubmitRequest request) {
        return quizService.submitQuiz(request);
    }
}