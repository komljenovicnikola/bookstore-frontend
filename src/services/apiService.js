import axios from 'axios';

const apiService = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

export const login = async (formData, setUserType, navigate, setError) => {
    try {
        const response = await apiService.post('/users/login', formData);
        const userType = response.data.role;
        setUserType(userType);
        navigate('/bookstore');
    } catch (error) {
        setError('Invalid email or password');
        console.error(error.response.data);
    }
}

export const register = async (formData, navigate, setError) => {
    try {
        const response = await apiService.post('/users/register', formData);
        console.log(response.data);
        navigate('/');
    } catch (error) {
        setError('Registration failed');
        console.error(error.response.data);
    }
}