import api from "./axios";

export const getUsers = () => api.get("/users");

export const getUserById = (id) => api.get(`/users/${id}`);

export const createUser = (data) => api.post("/users", data);

export const updateUserById = (id, data) => api.put(`/users/${id}`, data);

export const deleteUserById = (id) => api.delete(`/users/${id}`);

export const deleteAllUsers = () => api.delete("/users");

export const getCurrentUser = () => api.get("/users/current");

export const getDocentes = () => api.get("/users/docentes");

export const changePassword = (data) => api.put("/users/password", data);
