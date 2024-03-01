import axios from 'axios';

const apiService = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

export const login = async (formData, setUserDetails, navigate, setError) => {
    try {
        const response = await apiService.post('/users/login', formData);
        const userDetails = {
            "id": response.data.id,
            "role": response.data.role,
            "first_name": response.data.first_name,
            "last_name": response.data.last_name,
        };
        setUserDetails(userDetails);
        navigate('/bookstore');
    } catch (error) {
        setError('Invalid email or password');
    }
}

export const register = async (formData, navigate, setError) => {
    try {
        const response = await apiService.post('/users/register', formData);
        console.log(response.data);
        navigate('/');
    } catch (error) {
        setError('Registration failed');
    }
}

export const removeBook = async (userId, bookId, borrowedBooks, setBorrowedBooks) => {
    try {
        await apiService.delete(`books/${userId}/return/${bookId}`);
        const updatedBooks = borrowedBooks.filter(book => book.id !== bookId);
        setBorrowedBooks(updatedBooks);
    } catch (error) {
        console.error('Error removing book:', error);
    }
}