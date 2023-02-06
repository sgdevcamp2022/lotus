import React, { FC } from 'react';
import { Routes, Route, Navigate, BrowserRouter } from 'react-router-dom';
import { MainPage } from '@layouts//MainPage';
import Login from '@pages/Login';
import Signup from '@pages/Signup';
import Community from '@pages/Community';
import Party from '@pages/Party';
import Home from '@pages/Home';
import Notice from '@pages/Notice';

const App: FC = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route element={<MainPage />}>
        <Route path={'/'} element={<Home />} />
        <Route path={'community'} element={<Community />} />
        <Route path={'party'} element={<Party />} />
        <Route path={'notice'} element={<Notice />} />
      </Route>
      <Route path="*" element={<Navigate to={'/'} replace />} />
    </Routes>
  );
};

export default App;
