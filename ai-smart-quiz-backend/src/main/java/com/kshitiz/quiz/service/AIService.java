package com.kshitiz.quiz.service;

import com.kshitiz.quiz.dto.AISaveRequest;
import com.kshitiz.quiz.dto.QuestionDTO;
import com.kshitiz.quiz.entity.Category;
import com.kshitiz.quiz.entity.Question;
import com.kshitiz.quiz.enums.Difficulty;
import com.kshitiz.quiz.repository.CategoryRepository;
import com.kshitiz.quiz.repository.QuestionRepository;
import org.springframework.stereotype.Service;

@Service
public class AIService {

    private final QuestionRepository questionRepository;
    private final CategoryRepository categoryRepository;

    public AIService(QuestionRepository questionRepository,
                     CategoryRepository categoryRepository) {
        this.questionRepository = questionRepository;
        this.categoryRepository = categoryRepository;
    }

    public String saveQuestions(AISaveRequest request) {

        System.out.println("========== SAVE AI ==========");
        System.out.println("Category ID: " + request.getCategoryId());
        System.out.println("Questions Count: " + request.getQuestions().size());

        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Category Not Found"));

        for (QuestionDTO dto : request.getQuestions()) {

            System.out.println("Saving: " + dto.getQuestion());
            System.out.println("Difficulty: " + dto.getDifficulty());

            Question question = Question.builder()
                    .question(dto.getQuestion())
                    .optionA(dto.getOptionA())
                    .optionB(dto.getOptionB())
                    .optionC(dto.getOptionC())
                    .optionD(dto.getOptionD())
                    .correctAnswer(dto.getCorrectAnswer())
                    .difficulty(Difficulty.valueOf(dto.getDifficulty()))
                    .category(category)
                    .build();

            questionRepository.save(question);

            System.out.println("Saved Successfully");
        }

        return "Questions Saved Successfully";
    }
}