import React, { FC } from 'react';
import { Routes, Route, Navigate, BrowserRouter } from 'react-router-dom';
import { MainPage } from '@pages/MainPage';
import Login from '@pages/Login';
import Signup from '@pages/Signup';

const App: FC = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/Mainpage" element={<MainPage />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="*" element={<Navigate to={'/login'} replace />} />
    </Routes>
  );
};

export default App;
