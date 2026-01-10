import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'https://695f963f7f037703a81432c3.mockapi.io/v1',
    headers: {
        'Content-Type': 'application/json',
    }
})

apiClient.interceptors.response.use(
    response => response,
    error => {
        console.error('API Error:' , error.response?.data || error.message);
        return Promise.reject(error);
    }
)

export default apiClient;