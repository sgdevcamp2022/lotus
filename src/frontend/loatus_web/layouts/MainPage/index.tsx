import React, { useCallback, useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import useSWR from 'swr';
import { IUser, lostarkInfo } from '@typings/db';
import fetcher from '@utils/fetcher';
import { useCookies } from 'react-cookie';
import { toast, ToastContainer } from 'react-toastify';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import gravatar from 'gravatar';
import LostarkAuth from '@components/LostarkAuth';
import { Outlet } from 'react-router';

export const MainPage = () => {
  const [cookie, setCookie] = useCookies(['accessToken']);
  const {
    data: userData,
    error,
    mutate,
  } = useSWR<IUser | undefined | null>(cookie.accessToken ? ['/auth/my', cookie.accessToken] : null, fetcher);

  const onClickLogout = useCallback(() => {
    axios
      .get('/auth/logout', {
        headers: {
          Authorization: 'Bearer ' + cookie.accessToken,
        },
        withCredentials: true,
      })
      .then((response) => {
        toast.success(response.data.message, {
          position: 'top-right',
        });
        //setCookie('accessToken', '');
        mutate();
      })
      .catch((error) => {
        toast.error('로그아웃에 실패했습니다.', {
          position: 'top-right',
        });
      });
  }, []);

  return (
    <div>
      <header role="banner">
        <Navbar bg="light" expand="lg" style={{ marginBottom: 20 }}>
          <Container fluid>
            <Navbar.Brand href={'/home'}>Loatus</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="/home">홈</Nav.Link>
                <Nav.Link href="/party">모집</Nav.Link>
                <Nav.Link href="/community">커뮤니티</Nav.Link>
                <Nav.Link href="/notice">공지사항</Nav.Link>
              </Nav>
              <Nav>
                {userData ? (
                  <NavDropdown
                    title={
                      <span>
                        <img
                          src={
                            userData?.profile_image
                              ? userData?.profile_image
                              : gravatar.url(userData?.email, { s: '25', d: 'retro' })
                          }
                          width={'25'}
                          height={'25'}
                          alt={'avatar'}
                        />
                        &nbsp;{userData?.nickname}
                      </span>
                    }
                    id={'userinfo'}
                  >
                    <NavDropdown.Item href={'/mypage'}>마이페이지</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={onClickLogout}>로그아웃</NavDropdown.Item>
                  </NavDropdown>
                ) : (
                  <Nav.Link href={'/login'}>로그인</Nav.Link>
                )}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>
      <main role="main">
        {userData && <LostarkAuth />}
        <Outlet />
      </main>

      <ToastContainer />
    </div>
  );
};
