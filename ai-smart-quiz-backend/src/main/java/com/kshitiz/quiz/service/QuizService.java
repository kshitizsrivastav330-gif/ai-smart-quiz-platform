package com.kshitiz.quiz.service;

import com.kshitiz.quiz.dto.AnswerRequest;
import com.kshitiz.quiz.dto.QuestionResponse;
import com.kshitiz.quiz.dto.QuizRequest;
import com.kshitiz.quiz.dto.QuizResultResponse;
import com.kshitiz.quiz.dto.QuizSubmitRequest;
import com.kshitiz.quiz.entity.Category;
import com.kshitiz.quiz.entity.Question;
import com.kshitiz.quiz.entity.Quiz;
import com.kshitiz.quiz.entity.QuizAttempt;
import com.kshitiz.quiz.entity.User;
import com.kshitiz.quiz.repository.CategoryRepository;
import com.kshitiz.quiz.repository.QuestionRepository;
import com.kshitiz.quiz.repository.QuizAttemptRepository;
import com.kshitiz.quiz.repository.QuizRepository;
import com.kshitiz.quiz.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.Collections;
import java.util.List;

@Service
public class QuizService {

    @Autowired
    private QuizRepository quizRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private QuestionRepository questionRepository;

    @Autowired
    private QuizAttemptRepository quizAttemptRepository;

    @Autowired
    private UserRepository userRepository;

    // ================= CREATE QUIZ =================

    public String createQuiz(QuizRequest request) {

        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Category Not Found"));

        Quiz quiz = Quiz.builder()
                .title(request.getTitle())
                .difficulty(request.getDifficulty())
                .numberOfQuestions(request.getNumberOfQuestions())
                .category(category)
                .build();

        quizRepository.save(quiz);

        return "Quiz Created Successfully";
    }

    // ================= START QUIZ =================

    public List<QuestionResponse> startQuiz(Long quizId) {

        Quiz quiz = quizRepository.findById(quizId)
                .orElseThrow(() -> new RuntimeException("Quiz Not Found"));

        List<Question> questions =
                questionRepository.findByCategoryIdAndDifficulty(
                        quiz.getCategory().getId(),
                        quiz.getDifficulty());

        System.out.println("==================================");
        System.out.println("Quiz ID: " + quizId);
        System.out.println("Category ID: " + quiz.getCategory().getId());
        System.out.println("Difficulty: " + quiz.getDifficulty());
        System.out.println("Questions Found: " + questions.size());

        for (Question q : questions) {
            System.out.println(q.getId() + " -> " + q.getQuestion());
        }

        Collections.shuffle(questions);

        return questions.stream()
                .limit(quiz.getNumberOfQuestions())
                .map(question -> QuestionResponse.builder()
                        .id(question.getId())
                        .question(question.getQuestion())
                        .optionA(question.getOptionA())
                        .optionB(question.getOptionB())
                        .optionC(question.getOptionC())
                        .optionD(question.getOptionD())
                        .build())
                .toList();
    }

    // ================= SUBMIT QUIZ =================

    public QuizResultResponse submitQuiz(QuizSubmitRequest request) {

        int score = 0;

        for (AnswerRequest answer : request.getAnswers()) {

            Question question = questionRepository.findById(answer.getQuestionId())
                    .orElseThrow(() -> new RuntimeException("Question Not Found"));

            if (question.getCorrectAnswer()
                    .equalsIgnoreCase(answer.getSelectedAnswer())) {

                score++;
            }
        }

        int totalQuestions = request.getAnswers().size();

        double percentage = ((double) score / totalQuestions) * 100;

        String result = percentage >= 40 ? "PASS" : "FAIL";

        Quiz quiz = quizRepository.findById(request.getQuizId())
                .orElseThrow(() -> new RuntimeException("Quiz Not Found"));

        // Temporary user (Later we'll get from JWT)
        Authentication authentication = SecurityContextHolder
                .getContext()
                .getAuthentication();

        String email = authentication.getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User Not Found"));

        QuizAttempt attempt = QuizAttempt.builder()
                .user(user)
                .quiz(quiz)
                .score(score)
                .totalQuestions(totalQuestions)
                .percentage(percentage)
                .result(result)
                .build();

        quizAttemptRepository.save(attempt);

        return QuizResultResponse.builder()
                .score(score)
                .totalQuestions(totalQuestions)
                .percentage(percentage)
                .result(result)
                .build();
    }
    public List<Quiz> getAllQuizzes() {
        return quizRepository.findAll();
    }

    public String deleteQuiz(Long id) {
        quizRepository.deleteById(id);
        return "Quiz Deleted Successfully";
    }
    public List<Quiz> getAvailableQuizzes() {

        List<Quiz> quizzes = quizRepository.findAll();

        return quizzes.stream()
                .filter(quiz -> {

                    List<Question> questions =
                            questionRepository.findByCategoryIdAndDifficulty(
                                    quiz.getCategory().getId(),
                                    quiz.getDifficulty());

                    return questions.size() >= quiz.getNumberOfQuestions();

                })
                .toList();
    }
    public List<QuizAttempt> getAllAttempts() {
        return quizAttemptRepository.findAllByOrderBySubmittedAtDesc();
    }
    public List<QuizAttempt> getLeaderboard() {
        return quizAttemptRepository.findAllByOrderByPercentageDesc();
    }

}