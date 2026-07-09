package com.kshitiz.quiz.controller;

import com.kshitiz.quiz.dto.QuestionResponse;
import com.kshitiz.quiz.dto.QuizRequest;
import com.kshitiz.quiz.dto.QuizResultResponse;
import com.kshitiz.quiz.dto.QuizSubmitRequest;
import com.kshitiz.quiz.entity.Quiz;
import com.kshitiz.quiz.entity.QuizAttempt;
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
    @GetMapping
    public List<Quiz> getAllQuizzes() {
        return quizService.getAllQuizzes();
    }

    @DeleteMapping("/{id}")
    public String deleteQuiz(@PathVariable Long id) {
        return quizService.deleteQuiz(id);
    }
    @GetMapping("/available")
    public List<Quiz> availableQuizzes() {
        return quizService.getAvailableQuizzes();
    }
    @GetMapping("/results")
    public List<QuizAttempt> getResults() {
        return quizService.getAllAttempts();
    }
    @GetMapping("/leaderboard")
    public List<QuizAttempt> leaderboard() {
        return quizService.getLeaderboard();
    }
}