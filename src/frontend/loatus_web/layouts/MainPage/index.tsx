import React, { useEffect } from 'react';
import useSWR from 'swr';
import { IUser } from '@typings/db';
import fetcher from '@utils/fetcher';
import { useCookies } from 'react-cookie';
import { ToastContainer } from 'react-toastify';
import LostarkAuth from '@components/LostarkAuth';
import { Outlet, useParams } from 'react-router';
import Header from '@components/Header';
import { Navigate } from 'react-router-dom';
import Home from '@pages/Home';

export const MainPage = () => {
  const { params } = useParams();
  const [cookie, setCookie] = useCookies(['accessToken']);
  const {
    data: userData,
    error,
    mutate,
  } = useSWR<IUser | undefined | null>(cookie.accessToken ? ['/auth/my', cookie.accessToken] : null, fetcher);

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
