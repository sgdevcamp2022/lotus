import React from 'react';
import { ToastContainer } from 'react-toastify';
import LostarkAuth from '@components/LostarkAuth';
import { Outlet } from 'react-router';
import Header from '@components/Header';
import useToken from '@hooks/useToken';
import useSWRRetry from '@hooks/useSWRRetry';
import { useCookies } from 'react-cookie';

const MainPage = () => {
  const [accessToken, setAccessToken] = useToken();
  const [token] = useCookies(['refreshToken']);
  const { data: userData, error, mutate } = useSWRRetry('/auth/my', accessToken, setAccessToken, token.refreshToken);

  return (
    <div>
      <Header />
      <main role="main">
        {userData && <LostarkAuth />}
        <Outlet />
      </main>
      <ToastContainer />
    </div>
  );
};

export default MainPage;
