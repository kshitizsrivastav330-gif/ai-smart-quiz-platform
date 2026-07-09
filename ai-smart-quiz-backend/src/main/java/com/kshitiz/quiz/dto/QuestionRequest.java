package com.kshitiz.quiz.dto;

import com.kshitiz.quiz.enums.Difficulty;
import lombok.Data;

@Data
public class QuestionRequest {

    private String question;

    private String optionA;

    private String optionB;

    private String optionC;

    private String optionD;

    private String correctAnswer;

    private Difficulty difficulty;

    private Long categoryId;

}