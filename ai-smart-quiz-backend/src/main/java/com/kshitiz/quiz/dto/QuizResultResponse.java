package com.kshitiz.quiz.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@AllArgsConstructor
@Builder
public class QuizResultResponse {

    private Integer score;

    private Integer totalQuestions;

    private Double percentage;

    private String result;

}