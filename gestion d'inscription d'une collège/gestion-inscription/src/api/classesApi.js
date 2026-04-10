import api from "./axios";

const PREFIX = "/classes";

export const getClasses = () => api.get(PREFIX);
export const createClasse = (data) => api.post(PREFIX, data);
export const updateClasse = (id, data) => api.put(`${PREFIX}/${id}`, data);
export const deleteClasse = (id) => api.delete(`${PREFIX}/${id}`);