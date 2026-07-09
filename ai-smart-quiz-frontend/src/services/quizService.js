import api from "../api/axios";

const token = () => ({
    headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
    },
});

export const createQuiz = (quiz) => {
    return api.post("/quizzes", quiz, token());
};

export const getQuizzes = () => {
    return api.get("/quizzes", token());
};

export const deleteQuiz = (id) => {
    return api.delete(`/quizzes/${id}`, token());
};