import api from "./axios";

const PREFIX = "/eleves";

export const getEleves = () => api.get(PREFIX);
export const createEleve = (data) => api.post(PREFIX, data);
export const updateEleve = (id, data) => api.put(`${PREFIX}/${id}`, data);
export const deleteEleve = (id) => api.delete(`${PREFIX}/${id}`);

