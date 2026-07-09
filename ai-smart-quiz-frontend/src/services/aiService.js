import api from "../api/axios";

const token = () => ({
    headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
    },
});

export const generateAIQuestions = (data) => {
    return api.post("/ai/generate", data, token());
};

export const saveAIQuestions = (data) => {
    return api.post("/ai/save", data, token());
};