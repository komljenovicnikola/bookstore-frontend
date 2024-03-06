import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter as Router } from 'react-router-dom';
import RegistrationForm from './RegisterationForm';

jest.mock('../../services/apiService', () => ({
  register: jest.fn(),
}));

describe('RegistrationForm component', () => {
  it('updates name, email, and password fields when typing', () => {
    const { getByLabelText } = render(
      <Router>
        <RegistrationForm />
      </Router>,
    );
    const emailInput = getByLabelText('Email');
    const firstNameInput = getByLabelText('First Name');
    const lasttNameInput = getByLabelText('Last Name');
    const passwordInput = getByLabelText('Password');

    fireEvent.change(firstNameInput, { target: { value: 'John' } });
    fireEvent.change(lasttNameInput, { target: { value: 'Doe' } });
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    expect(firstNameInput.value).toBe('John');
    expect(lasttNameInput.value).toBe('Doe');
    expect(emailInput.value).toBe('test@example.com');
    expect(passwordInput.value).toBe('password123');
  });
});
