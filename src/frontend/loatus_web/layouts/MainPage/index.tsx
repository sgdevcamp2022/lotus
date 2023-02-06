import React from 'react';
import useSWR from 'swr';
import { APIItem, IUser } from '@typings/db';
import fetcher from '@utils/fetcher';
import { useCookies } from 'react-cookie';
import { ToastContainer } from 'react-toastify';
import LostarkAuth from '@components/LostarkAuth';
import { Outlet } from 'react-router';
import Header from '@components/Header';

export const MainPage = () => {
  const [cookie, setCookie] = useCookies(['accessToken']);
  const {
    data: userData,
    error,
    mutate,
  } = useSWR<APIItem<IUser> | null>(cookie.accessToken ? ['/auth/my', cookie.accessToken] : null, fetcher);

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
