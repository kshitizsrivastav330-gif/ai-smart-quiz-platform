package com.kshitiz.quiz.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.kshitiz.quiz.ai.GroqService;
import com.kshitiz.quiz.dto.AiQuestionDto;
import com.kshitiz.quiz.dto.AiQuestionRequest;
import com.kshitiz.quiz.entity.Category;
import com.kshitiz.quiz.entity.Question;
import com.kshitiz.quiz.repository.CategoryRepository;
import com.kshitiz.quiz.repository.QuestionRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class AiService {

    private final GroqService groqService;
    private final QuestionRepository questionRepository;
    private final CategoryRepository categoryRepository;
    private final ObjectMapper objectMapper;

    public AiService(GroqService groqService,
                     QuestionRepository questionRepository,
                     CategoryRepository categoryRepository) {

        this.groqService = groqService;
        this.questionRepository = questionRepository;
        this.categoryRepository = categoryRepository;
        this.objectMapper = new ObjectMapper();
    }

    public String generateAndSaveQuestions(AiQuestionRequest request) {

        try {

            // Generate AI Questions
            String aiResponse = groqService.generateQuestions(
                    request.getTopic(),
                    request.getDifficulty().name(),
                    request.getNumberOfQuestions()
            );

            // Get Category
            Category category = categoryRepository.findById(request.getCategoryId())
                    .orElseThrow(() -> new RuntimeException("Category Not Found"));

            // Convert JSON -> DTO List
            List<AiQuestionDto> aiQuestions = objectMapper.readValue(
                    aiResponse,
                    new TypeReference<List<AiQuestionDto>>() {
                    }
            );

            // DTO -> Entity
            List<Question> questions = new ArrayList<>();

            for (AiQuestionDto dto : aiQuestions) {

                Question question = Question.builder()
                        .question(dto.getQuestion())
                        .optionA(dto.getOptionA())
                        .optionB(dto.getOptionB())
                        .optionC(dto.getOptionC())
                        .optionD(dto.getOptionD())
                        .correctAnswer(dto.getCorrectAnswer())
                        .difficulty(request.getDifficulty())
                        .category(category)
                        .build();

                questions.add(question);
            }

            // Save in Database
            questionRepository.saveAll(questions);

            return questions.size() + " Questions Generated and Saved Successfully";

        } catch (Exception e) {
            e.printStackTrace();
            return "Error : " + e.getMessage();
        }
    }
}