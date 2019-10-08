import axios from 'axios';

const api = axios.create({
    baseURL: 'http://192.168.20.64:3000',
});

export default api;