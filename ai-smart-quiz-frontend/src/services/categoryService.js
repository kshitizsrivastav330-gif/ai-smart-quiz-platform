import api from "../api/axios";

const token = () => ({
    headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
    },
});

export const getCategories = () => {
    return api.get("/categories", token());
};

export const addCategory = (category) => {
    return api.post("/categories", category, token());
};

export const updateCategory = (id, category) => {
    return api.put(`/categories/${id}`, category, token());
};

export const deleteCategory = (id) => {
    return api.delete(`/categories/${id}`, token());
};