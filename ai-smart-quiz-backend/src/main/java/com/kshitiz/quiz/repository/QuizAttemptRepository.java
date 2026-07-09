package com.kshitiz.quiz.repository;

import com.kshitiz.quiz.entity.QuizAttempt;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface QuizAttemptRepository extends JpaRepository<QuizAttempt, Long> {

    List<QuizAttempt> findByUserId(Long userId);

    List<QuizAttempt> findAllByOrderBySubmittedAtDesc();

    List<QuizAttempt> findAllByOrderByPercentageDesc();

}