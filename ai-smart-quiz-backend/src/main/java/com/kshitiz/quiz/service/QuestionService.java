package com.kshitiz.quiz.service;

import com.kshitiz.quiz.dto.QuestionRequest;
import com.kshitiz.quiz.entity.Category;
import com.kshitiz.quiz.entity.Question;
import com.kshitiz.quiz.repository.CategoryRepository;
import com.kshitiz.quiz.repository.QuestionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class QuestionService {

    @Autowired
    private QuestionRepository questionRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    // Add Question
    public String addQuestion(QuestionRequest request) {

        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Category Not Found"));

        Question question = Question.builder()
                .question(request.getQuestion())
                .optionA(request.getOptionA())
                .optionB(request.getOptionB())
                .optionC(request.getOptionC())
                .optionD(request.getOptionD())
                .correctAnswer(request.getCorrectAnswer())
                .difficulty(request.getDifficulty())
                .category(category)
                .build();

        questionRepository.save(question);

        return "Question Added Successfully";
    }

    // Get All Questions
    public List<Question> getAllQuestions() {
        return questionRepository.findAll();
    }

    // Delete Question
    public String deleteQuestion(Long id) {

        Question question = questionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Question Not Found"));

        questionRepository.delete(question);

        return "Question Deleted Successfully";
    }

}