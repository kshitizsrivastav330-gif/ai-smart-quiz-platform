package com.kshitiz.quiz.dto;

import lombok.Data;

@Data
public class AIQuestionRequest {

    private Long categoryId;

    private String difficulty;

    private Integer numberOfQuestions;

}