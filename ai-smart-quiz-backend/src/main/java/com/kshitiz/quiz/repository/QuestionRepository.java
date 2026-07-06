package com.kshitiz.quiz.repository;

import com.kshitiz.quiz.entity.Question;
import com.kshitiz.quiz.enums.Difficulty;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface QuestionRepository extends JpaRepository<Question, Long> {

    List<Question> findByCategoryId(Long categoryId);
    List<Question> findByCategoryIdAndDifficulty(Long categoryId, Difficulty difficulty);

}