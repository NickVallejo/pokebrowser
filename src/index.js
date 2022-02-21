import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Login from './pages/login/Login'
import Register from './pages/register/Register'

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/app" element={<App/>} />
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);
