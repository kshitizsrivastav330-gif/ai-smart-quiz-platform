package com.kshitiz.quiz.controller;

import com.kshitiz.quiz.dto.DashboardResponse;
import com.kshitiz.quiz.service.DashboardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    @Autowired
    private DashboardService dashboardService;

    @GetMapping
    public DashboardResponse dashboard() {

        return dashboardService.getDashboard();

    }

}