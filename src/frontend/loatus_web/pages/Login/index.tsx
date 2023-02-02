import React, { useCallback, useEffect, useState } from 'react';
import useInput from '@hooks/useInput';
import axios, { AxiosResponse } from 'axios';
import { Button, Header, Horizon, Hr, Input, Page, PageHead, Root, SignIn } from '@pages/Login/styles';
import { Link, Navigate, useSearchParams } from 'react-router-dom';
import { IToken, IUser } from '@typings/db';
import useSWR from 'swr';
import { useCookies } from 'react-cookie';
import fetcher from '@utils/fetcher';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form } from 'react-bootstrap';

const Login = () => {
  const [cookie, setCookie] = useCookies(['accessToken']);
  const [email, onChangeEmail, setEmail] = useInput('');
  const [password, onChangePassword, setPassword] = useInput('');
  const {
    data: userData,
    error,
    mutate,
  } = useSWR<IUser>(cookie.accessToken ? ['/auth/my', cookie.accessToken] : null, fetcher);
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
        .then((response) => {
          if (response?.data.code !== 200) {
            toast.error(response.data.message, {
              position: 'top-right',
            });
          }
          setCookie('accessToken', response?.data.object.accessToken, { path: '/' });
          mutate();
          setEmail('');
        })
        .catch((error) => {
          toast.error(
            error.response.status === 504 ? '네트워크가 연결되지 않았습니다!' : '아이디나 비밀번호를 확인해 주세요!',
            {
              position: 'top-right',
            },
          );

          //TODO: debug 삭제
          console.dir(error);
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
          <Button>
            <a href={'http://localhost:8080/oauth2/authorization/naver'}>네이버를 사용하여 로그인</a>
          </Button>
          <Button>
            <a href={'http://localhost:8080/oauth2/authorization/kakao'}>카카오를 사용하여 로그인</a>
          </Button>
          <Button>
            <a href={'http://localhost:8080/oauth2/authorization/google'}>구글을 사용하여 로그인</a>
          </Button>
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
