import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RegistrationForm from './RegistrationForm/RegisterationForm';
import LoginForm from './LoginForm/LoginForm';
import Bookstore from './Bookstore/Bookstore';
import { useState } from 'react';

const App = () => {
  const [userDetails, setUserDetails] = useState(null);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<LoginForm setUserDetails={setUserDetails} />}
        />

        <Route path="/register" element={<RegistrationForm />} />
        <Route
          path="/bookstore"
          element={<Bookstore userDetails={userDetails} />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
