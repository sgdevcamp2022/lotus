import React, { useContext } from 'react';
import useSWR from 'swr';
import { APIItem, IUser } from '@typings/db';
import fetcher from '@utils/fetcher';
import { useCookies } from 'react-cookie';
import { ToastContainer } from 'react-toastify';
import LostarkAuth from '@components/LostarkAuth';
import { Outlet } from 'react-router';
import Header from '@components/Header';
import useToken from '@utils/useToken';

export const MainPage = () => {
  const [accessToken] = useToken();
  const {
    data: userData,
    error,
    mutate,
  } = useSWR<IUser | null>(accessToken ? ['/auth/my', accessToken] : null, fetcher);

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
