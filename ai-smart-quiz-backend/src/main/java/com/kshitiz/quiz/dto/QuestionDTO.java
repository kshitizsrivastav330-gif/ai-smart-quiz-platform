package com.kshitiz.quiz.dto;

import lombok.Data;

@Data
public class QuestionDTO {

    private String question;

    private String optionA;

    private String optionB;

    private String optionC;

    private String optionD;

    private String correctAnswer;

    private String difficulty;
}