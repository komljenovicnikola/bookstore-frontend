import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../../services/apiService';

const RegistrationForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    password: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }
    const transformedData = {
      ...formData,
      first_name: formData.firstName,
      last_name: formData.lastName,
    };
    register(transformedData, navigate, setError);
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">
                Bookstore Register
              </h2>
              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="firstName" className="form-label">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="lastName" className="form-label">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100">
                  Register
                </button>
              </form>
              <div className="mt-3 text-center">
                Already have an account? <Link to="/">Login</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;
