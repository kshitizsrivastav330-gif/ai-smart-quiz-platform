package com.kshitiz.quiz.dto;

import lombok.Data;

import java.util.List;

@Data
public class QuizSubmitRequest {

    private Long quizId;

    private List<AnswerRequest> answers;

}