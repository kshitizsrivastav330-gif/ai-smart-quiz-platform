package com.kshitiz.quiz.dto;

import com.kshitiz.quiz.enums.Difficulty;
import lombok.Data;

@Data
public class AiQuestionRequest {

    private String topic;

    private Difficulty difficulty;

    private Integer numberOfQuestions;

    private Long categoryId;

}