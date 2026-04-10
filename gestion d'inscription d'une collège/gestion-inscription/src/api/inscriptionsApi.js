import api from "./axios";

const PREFIX = "/inscriptions";

export const getInscriptions = () => api.get(PREFIX);
export const createInscription = (data) => api.post(PREFIX, data);
export const deleteInscription = (id) => api.delete(`${PREFIX}/${id}`);


/* export const updateInscription = (id) => api.update(`${PREFIX}/${id}`);

// UPDATE (NOUVEAU)
export const updateInscription = (id, data) => 
  axios.put(`/inscriptions/${id}`, data); */
// UPDATE (CORRIGÉ)
export const updateInscription = (id, data) => api.put(`${PREFIX}/${id}`, data);