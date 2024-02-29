import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RegistrationForm from './RegistrationForm/RegisterationForm';
import LoginForm from './LoginForm/LoginForm';
import Bookstore from './Bookstore/Bookstore';
import { useState } from 'react';

const App = () => {
  const [userType, setUserType] = useState(null);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginForm  setUserType={setUserType}/>}/>

        <Route path="/register" element={<RegistrationForm />}/>
        <Route path="/bookstore" element={<Bookstore userType={userType} />}/>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
