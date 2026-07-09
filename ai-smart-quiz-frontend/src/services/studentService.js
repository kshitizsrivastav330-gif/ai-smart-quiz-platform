import api from "../api/axios";

const token = () => ({
    headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
    },
});

export const getAvailableQuizzes = () => {
    return api.get("/quizzes/available", token());
};

export const startQuiz = (id) => {
    return api.get(`/quizzes/${id}/start`, token());
};

export const submitQuiz = (data) => {
    return api.post("/quizzes/submit", data, token());
};