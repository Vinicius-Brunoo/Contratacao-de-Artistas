import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8000/api',
});

export const createContratacao = (data) => api.post('/contratacoes', data);
export const getContratacoes = () => api.get('/contratacoes');
