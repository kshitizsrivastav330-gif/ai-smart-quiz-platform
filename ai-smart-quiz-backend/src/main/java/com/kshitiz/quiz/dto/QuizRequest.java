package com.kshitiz.quiz.dto;

import com.kshitiz.quiz.enums.Difficulty;
import lombok.Data;

@Data
public class QuizRequest {

    private String title;

    private Long categoryId;

    private Difficulty difficulty;

    private Integer numberOfQuestions;
}