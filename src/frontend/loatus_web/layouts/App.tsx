import React, { FC } from 'react';
import { Routes, Route, Navigate, BrowserRouter } from 'react-router-dom';
import { MainPage } from '@layouts//MainPage';
import Login from '@pages/Login';
import Signup from '@pages/Signup';
import Board from '@pages/Board';
import Party from '@pages/Party';
import Home from '@pages/Home';
import Notice from '@pages/Notice';
import PostLists from '@pages/PostLists';
import PostWrite from '@pages/PostWrite';

const App: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route element={<MainPage />}>
          <Route path={'party'} element={<Party />} />
          <Route path={'notice'} element={<Notice />} />
          <Route path={'board'} element={<Board />}>
            <Route path={'lists'} element={<PostLists />} />
            <Route path={'write'} element={<PostWrite />} />
          </Route>
          <Route path={'/'} element={<Home />} />
        </Route>
        <Route path="*" element={<Navigate to={'/'} replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
