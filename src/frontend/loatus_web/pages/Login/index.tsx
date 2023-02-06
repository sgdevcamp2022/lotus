import React, { useCallback, useEffect, useState } from 'react';
import useInput from '@hooks/useInput';
import axios, { AxiosResponse } from 'axios';
import { Button, Header, Horizon, Hr, Input, Page, PageHead, Root, SignIn } from '@pages/Login/styles';
import { Link, Navigate, useSearchParams } from 'react-router-dom';
import { APIItem, IToken, IUser } from '@typings/db';
import useSWR from 'swr';
import { useCookies } from 'react-cookie';
import fetcher from '@utils/fetcher';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form } from 'react-bootstrap';

const Login = () => {
  const [cookie, setCookie] = useCookies(['accessToken']);
  const [refreshToken, setRefreshToken] = useCookies(['refreshToken']);
  const [email, onChangeEmail, setEmail] = useInput('');
  const [password, onChangePassword, setPassword] = useInput('');
  const {
    data: userData,
    error,
    mutate,
  } = useSWR<APIItem<IUser> | null>(cookie.accessToken ? ['/auth/my', cookie.accessToken] : null, fetcher);
  const [params, setParams] = useSearchParams();

  useEffect(() => {
    if (params.get('accessToken')) {
      setCookie('accessToken', params.get('accessToken'));
    }
  }, []);

  const onSubmitLogin = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      axios
        .post(
          `/auth/login`,
          {
            email,
            password,
          },
          {
            withCredentials: true,
          },
        )
        .then((response: AxiosResponse<APIItem<IToken>>) => {
          if (response?.data.code === 200) {
            toast.success(response.data.message, {
              position: 'top-right',
            });
          } else {
            toast.error(response.data.message, {
              position: 'top-right',
            });
            return;
          }
          setCookie('accessToken', response?.data.data.accessToken, { path: '/' });
          setRefreshToken('refreshToken', response?.data.data.refreshToken, { path: '/' });
          setEmail('');
          mutate();
        })
        .catch((error) => {
          toast.error('요청이 실패했습니다.\n관리자에게 문의하세요!', {
            position: 'top-right',
          });
        })
        .finally(() => setPassword(''));
    },
    [email, password],
  );

  if (userData) {
    return <Navigate to="/" replace />;
  }

  return (
    <Root>
      <Header>
        <div className="left-col"></div>
        <div className="center-col">
          <h1 style={{ textAlign: 'center' }}>Loatus</h1>
        </div>
        <div className="right-col">
          <div
            style={{
              color: 'rgba(var(--sk_foreground_max_solid,97,96,97),1)',
              fontSize: '13px',
              paddingRight: '40px',
              textAlign: 'right',
            }}
          >
            <div>Loatus가 처음이신가요?</div>
            <Link to="/signup">계정 생성</Link>
          </div>
        </div>
      </Header>
      <Page>
        <PageHead>이메일로 로그인해 보세요.</PageHead>
        <SignIn>
          <a href={'http://localhost:8080/oauth2/authorization/naver'}>
            <Button>네이버를 사용하여 로그인</Button>
          </a>
          <a href={'http://localhost:8080/oauth2/authorization/kakao'}>
            <Button>카카오를 사용하여 로그인</Button>
          </a>
          <a href={'http://localhost:8080/oauth2/authorization/google'}>
            <Button>구글을 사용하여 로그인</Button>
          </a>
          <Horizon>
            <Hr />
            <div style={{ padding: '0 20px' }}>또는</div>
            <Hr />
          </Horizon>
          <Form onSubmit={onSubmitLogin}>
            <Form.Label id="email-label">이메일</Form.Label>
            <Input placeholder={'name@email.com'} type="email" value={email} onChange={onChangeEmail} />
            <Form.Label id="password-label">비밀번호</Form.Label>
            <Input type="password" value={password} onChange={onChangePassword} />
            <Button type="submit">로그인</Button>
          </Form>
        </SignIn>
      </Page>
      <ToastContainer />
    </Root>
  );
};

export default Login;
