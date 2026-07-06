package com.kshitiz.quiz.dto;

import lombok.Data;

@Data
public class AiQuestionDto {

    private String question;
    private String optionA;
    private String optionB;
    private String optionC;
    private String optionD;
    private String correctAnswer;

}