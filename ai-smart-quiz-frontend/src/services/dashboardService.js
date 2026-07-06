import api from "../api/axios";

export const getDashboard = () => {
    return api.get("/dashboard", {
        headers: {
            Authorization: "Bearer " + localStorage.getItem("token")
        }
    });
};