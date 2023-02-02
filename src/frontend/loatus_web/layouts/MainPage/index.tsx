import React, { useCallback, useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import useSWR from 'swr';
import { IUser, lostarkInfo } from '@typings/db';
import fetcher from '@utils/fetcher';
import { useCookies } from 'react-cookie';
import { toast, ToastContainer } from 'react-toastify';
import {
  Button,
  Card,
  Form,
  Col,
  Container,
  InputGroup,
  Nav,
  Navbar,
  NavDropdown,
  NavLink,
  Row,
  SplitButton,
} from 'react-bootstrap';
import gravatar from 'gravatar';
import useInput from '@hooks/useInput';
import LostarkAuth from '@components/LostarkAuth';

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
      })
      .catch((error) => {
        toast.error('로그아웃에 실패했습니다.', {
          position: 'top-right',
        });
      });
  }, []);

  const onClickRegist = useCallback(() => {
    axios
      .post(
        '/post/regist/',
        {
          title: 'test1',
          content: 'content test',
        },
        {
          headers: {
            authorization: cookie.accessToken,
          },
        },
      )
      .then((response) => {
        toast.success(response.data.message, {
          position: 'top-right',
        });
        console.log(response.data);
      })
      .catch((error) => {
        toast.error('실패', {
          position: 'top-right',
        });
        console.log(error);
      });
  }, []);

  return (
    <div>
      <header role="banner">
        <Navbar bg="light" expand="lg">
          <Container>
            <Navbar.Brand href={'/'}>Loatus</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="/login">홈</Nav.Link>
                <Nav.Link href="/party">모집</Nav.Link>
                <Nav.Link href="/community">커뮤니티</Nav.Link>
                <Nav.Link href="/post">공지사항</Nav.Link>
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
                          alt={'avatar'}
                        />
                        &nbsp;{userData?.nickname}
                      </span>
                    }
                    id={'userinfo'}
                  >
                    <NavDropdown.Item eventKey={'mypage'} href={'/mypage'}>
                      마이페이지
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item eventKey={'logout'} onClick={onClickLogout}>
                      로그아웃
                    </NavDropdown.Item>
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
        {/*TODO 인증 완료 후 받아오는 userData에서 인증됨을 증명하는 수단 찾기*/}
        {userData && <LostarkAuth />}
        <section>모집</section>
        <section>오늘 할 일</section>
        <section>공지</section>
        <section>
          <h1>기능테스트</h1>
          <Button onClick={onClickRegist}>가입하기</Button>
        </section>
      </main>

      <ToastContainer />
    </div>
  );
};
