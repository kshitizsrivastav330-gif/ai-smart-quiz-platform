package com.kshitiz.quiz.service;

import com.kshitiz.quiz.dto.DashboardResponse;
import com.kshitiz.quiz.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DashboardService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private QuestionRepository questionRepository;

    @Autowired
    private QuizRepository quizRepository;

    @Autowired
    private QuizAttemptRepository quizAttemptRepository;

    public DashboardResponse getDashboard() {

        return new DashboardResponse(

                userRepository.count(),

                categoryRepository.count(),

                questionRepository.count(),

                quizRepository.count(),

                quizAttemptRepository.count()
        );

    }
}