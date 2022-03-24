import React from 'react';
import ReactDOM from 'react-dom';
import AppWrap from './AppWrap';
import { Route, Routes, BrowserRouter, Navigate } from 'react-router-dom';
import Login from './pages/login/Login'
import Register from './pages/login/Register'
import TradeRoom from './pages/trade-room/TradeRoom'
import NotFound from './components/load-components/NotFound'

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/app" element={<AppWrap />} />
      <Route path="/trades/room/:id" element={<TradeRoom />} />
      <Route path="*" element={<NotFound text={"Page Not Found!"} />} />
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);
