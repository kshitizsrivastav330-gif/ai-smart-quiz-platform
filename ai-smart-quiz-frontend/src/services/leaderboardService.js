import api from "../api/axios";

const token = () => ({
    headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
    },
});

export const getLeaderboard = () => {
    return api.get("/quizzes/leaderboard", token());
};