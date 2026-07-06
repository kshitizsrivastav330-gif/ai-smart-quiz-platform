package com.kshitiz.quiz.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class DashboardResponse {

    private long users;
    private long categories;
    private long questions;
    private long quizzes;
    private long attempts;

}