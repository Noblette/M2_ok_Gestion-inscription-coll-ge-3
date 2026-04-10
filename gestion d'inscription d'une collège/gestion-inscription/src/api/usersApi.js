import api from "./axios";

const PREFIX = "/users";

export const getUsers = () => api.get(PREFIX);
export const createUser = (data) => api.post(PREFIX, data);
export const updateUser = (id, data) => api.put(`${PREFIX}/${id}`, data);
export const deleteUser = (id) => api.delete(`${PREFIX}/${id}`);