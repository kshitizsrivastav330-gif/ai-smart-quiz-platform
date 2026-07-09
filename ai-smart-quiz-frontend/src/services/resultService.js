import api from "../api/axios";

const token = () => ({
    headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
    },
});

export const getResults = () => {
    return api.get("/quizzes/results", token());
};