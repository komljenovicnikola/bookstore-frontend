import axios from 'axios';

const apiService = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

export const login = async (formData) => {
  try {
    const response = await apiService.post('/users/login', formData);
    const userDetails = {
      id: response.data.id,
      role: response.data.role,
      first_name: response.data.first_name,
      last_name: response.data.last_name,
    };
    return userDetails;
  } catch (error) {
    console.error('Error in user login:', error);
    throw error;
  }
};

export const register = async (formData) => {
  try {
    const response = await apiService.post('/users/register', formData);
    return response.data;
  } catch (error) {
    console.error('Error in user registration:', error);
    throw error;
  }
};

export const getCustomers = async () => {
  try {
    const response = await apiService.get('/users/customers');
    return response;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

export const getBooksByUser = async (userId) => {
  try {
    const response = await apiService.get(`/users/${userId}/books`);
    return response.data;
  } catch (error) {
    console.error('Error fetching borrowed books:', error);
    throw error;
  }
};

export const saveNewBook = async (bookData) => {
  try {
    const response = await apiService.post('/books/borrow', bookData);
    return response.data;
  } catch (error) {
    console.error('Error adding new book:', error);
    throw error;
  }
};

export const updateBook = async (bookData) => {
  try {
    const response = await apiService.put(`books/${bookData.id}`, bookData);
    return response.data;
  } catch (error) {
    console.error('Error updating book:', error);
    throw error;
  }
};

export const removeBook = async (userId, bookId) => {
  try {
    const response = await apiService.delete(
      `books/${userId}/return/${bookId}`,
    );
    return response.data;
  } catch (error) {
    console.error('Error removing book:', error);
    throw error;
  }
};
