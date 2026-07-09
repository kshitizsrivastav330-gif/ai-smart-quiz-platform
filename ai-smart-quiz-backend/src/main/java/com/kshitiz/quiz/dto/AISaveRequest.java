package com.kshitiz.quiz.dto;

import lombok.Data;

import java.util.List;

@Data
public class AISaveRequest {

    private Long categoryId;

    private List<QuestionDTO> questions;
}