import axios from 'axios';

const ConnectionAPI = axios.create({
    baseURL: 'http://localhost:3000/',
    withCredentials: true,
});

export default ConnectionAPI;
