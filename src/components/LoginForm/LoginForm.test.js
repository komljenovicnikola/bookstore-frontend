import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter as Router } from 'react-router-dom';
import LoginForm from './LoginForm';

jest.mock('../../services/apiService', () => ({
  login: jest.fn(),
}));

describe('LoginForm component', () => {
  it('updates email and password fields when typing', () => {
    const { getByLabelText } = render(
      <Router>
        <LoginForm />
      </Router>,
    );
    const emailInput = getByLabelText('Email');
    const passwordInput = getByLabelText('Password');

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    expect(emailInput.value).toBe('test@example.com');
    expect(passwordInput.value).toBe('password123');
  });
});
