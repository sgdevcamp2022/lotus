import React, { useCallback, useState } from 'react';
import useInput from '@hooks/useInput';
import axios, { AxiosResponse } from 'axios';
import { Button, Header, Horizon, Hr, Input, Page, PageHead, Root, SignIn } from '@pages/Login/styles';
import { Link, Navigate } from 'react-router-dom';
import { IToken, IUser } from '@typings/db';
import useSWR from 'swr';
import { useCookies } from 'react-cookie';
import fetcher from '@utils/fetcher';

const Login = () => {
  const [cookie, setCookie] = useCookies(['accessToken']);
  const [email, onChangeEmail, setEmail] = useInput('');
  const [password, onChangePassword, setPassword] = useInput('');
  const { data: userData, error, mutate } = useSWR<IUser | undefined | null>(cookie && '/auth/my', fetcher);

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
        .then((response: AxiosResponse<IToken>) => {
          setCookie('accessToken', response?.data.accessToken, { path: '/' });
          mutate();
          setEmail('');
        })
        .catch((error) => {
          console.dir(error);
        })
        .finally(() => setPassword(''));
    },
    [email, password],
  );

  if (userData) {
    return <Navigate to="/Mainpage" replace />;
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
          <Button>네이버를 사용하여 로그인</Button>
          <Button>카카오를 사용하여 로그인</Button>
          <Horizon>
            <Hr />
            <div style={{ padding: '0 20px' }}>또는</div>
            <Hr />
          </Horizon>
          <form onSubmit={onSubmitLogin}>
            <label id="email-label">
              <span>이메일</span>
              <Input placeholder={'name@email.com'} type="email" value={email} onChange={onChangeEmail} />
            </label>
            <label id="password-label">
              <span>비밀번호</span>
              <Input type="password" value={password} onChange={onChangePassword} />
            </label>
            <Button type="submit">로그인</Button>
          </form>
        </SignIn>
      </Page>
    </Root>
  );
};

export default Login;
