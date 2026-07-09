package com.kshitiz.quiz.controller;

import com.kshitiz.quiz.dto.QuestionRequest;
import com.kshitiz.quiz.entity.Question;
import com.kshitiz.quiz.service.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/questions")
public class QuestionController {

    @Autowired
    private QuestionService questionService;

    // Add Question
    @PostMapping
    public String addQuestion(@RequestBody QuestionRequest request) {
        return questionService.addQuestion(request);
    }

    // Get All Questions
    @GetMapping
    public List<Question> getAllQuestions() {
        return questionService.getAllQuestions();
    }

    // Delete Question
    @DeleteMapping("/{id}")
    public String deleteQuestion(@PathVariable Long id) {
        return questionService.deleteQuestion(id);
    }
}