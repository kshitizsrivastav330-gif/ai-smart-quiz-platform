import api from "../api/axios";

const token = () => ({
    headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
    },
});

// Get All Questions
export const getQuestions = () => {
    return api.get("/questions", token());
};

// Add Question
export const addQuestion = (question) => {
    return api.post("/questions", question, token());
};

// Delete Question
export const deleteQuestion = (id) => {
    return api.delete(`/questions/${id}`, token());
};