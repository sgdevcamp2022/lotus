import React, { FC } from 'react';
import { Routes, Route, Navigate, BrowserRouter } from 'react-router-dom';
import { MainPage } from '@layouts//MainPage';
import Login from '@pages/Login';
import Signup from '@pages/Signup';

const App: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="*" element={<Navigate to={'/login'} replace />} />
    </Routes>
  );
};

export default App;
