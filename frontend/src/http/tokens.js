import { api } from "./user";


export const getAllTokensRequest = async () => await api.get('/token/tokens');
export const getTokensRequest = async (id) => await api.get(`/token/tokens/${id}`);
export const buyTokenRequest = async (formData) => await api.post(`/token/buy-tokens`,formData);
export const sellTokenRequest = async (formData) => await api.post(`/token/sell-tokens`,formData);
export const addTokenRequest = async (formData) => await api.post(`/token/add-token`,formData,{
    headers: {
        'Content-Type': 'multipart/form-data'
    }
});