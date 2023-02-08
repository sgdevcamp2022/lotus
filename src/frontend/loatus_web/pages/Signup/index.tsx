import React, { FormEvent, useCallback, useContext, useState } from 'react';
import { Button, Header, Horizon, Hr, Input, Page, PageHead, Root, SignIn } from '@pages/Login/styles';
import { Link, Navigate } from 'react-router-dom';
import useInput from '@hooks/useInput';
import axios from 'axios';
import useSWR from 'swr';
import { APIItem, IUser } from '@typings/db';
import fetcher from '@utils/fetcher';
import { toast, ToastContainer } from 'react-toastify';
import { Form } from 'react-bootstrap';
import useToken from '@hooks/useToken';

const Signup = () => {
  const [email, onChangeEmail, setEmail] = useInput('');
  const [password, , setPassword] = useInput('');
  const [passwordCheck, , setPasswordCheck] = useInput('');
  const [nickname, onChangeNickname, setNickname] = useInput('');
  const [mismatchError, setMismatchError] = useState(false);
  const [signupSuccess, setSignupSuccess] = useState(false);
  const [accessToken] = useToken();
  const {
    data: userData,
    error,
    mutate,
  } = useSWR<IUser | null>(accessToken ? ['/auth/my', accessToken] : null, fetcher);
  const onChangePassword = useCallback(
    (e: any) => {
      setMismatchError(e.target.value === passwordCheck);
      setPassword(e.target.value);
    },
    [passwordCheck],
  );
  const onChangePasswordCheck = useCallback(
    (e: any) => {
      setMismatchError(e.target.value === password);
      setPasswordCheck(e.target.value);
    },
    [password],
  );

  const onSubmitSignup = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!email || !password || !mismatchError || !nickname) {
        return;
      }
      axios
        .post('/user/signup', {
          email,
          nickname,
          password,
        })
        .then((response) => {
          if (response.data.code === 200) {
            toast.success(response.data.message, {
              position: 'top-right',
            });
            setSignupSuccess(true);
          } else {
            toast.error(response.data.message, {
              position: 'top-right',
            });
            return;
          }
          setEmail('');
          setPassword('');
          setPasswordCheck('');
          setNickname('');
          mutate();
        })
        .catch((error) => {
          console.dir(error);
          toast.error('오류가 발생했습니다.\n기술팀에 문의해 주세요!', {
            position: 'top-right',
          });
          setSignupSuccess(false);
        });
    },
    [email, password, passwordCheck, nickname],
  );

  if (userData) {
    return <Navigate to={'/mainpage'} replace />;
  }
  return (
    <Root>
      <Header>
        <div className="left-col"></div>
        <div className="center-col">
          <h1 style={{ textAlign: 'center' }}>Loatus</h1>
        </div>
        <div className="right-col"></div>
      </Header>
      <Page>
        <PageHead>회원가입{signupSuccess && '을 성공했습니다!'}</PageHead>
        {signupSuccess ? (
          <div>
            <h4>지금 바로 로그인해 보세요</h4>
            <Button>
              <Link to={'/login'}>로그인 하러 가기</Link>
            </Button>
          </div>
        ) : (
          <SignIn>
            <Form onSubmit={onSubmitSignup}>
              <Form.Label id="email-label">이메일</Form.Label>
              <Input required placeholder={'name@email.com'} type="email" value={email} onChange={onChangeEmail} />
              <Form.Label id="password-label">비밀번호</Form.Label>
              <Input required type="password" value={password} onChange={onChangePassword} />
              <Form.Label id="password-check-label">비밀번호 확인</Form.Label>
              <Input required type="password" value={passwordCheck} onChange={onChangePasswordCheck} />
              <Form.Label id="nickname-label">닉네임</Form.Label>
              <Input required type="text" value={nickname} onChange={onChangeNickname} />
              <Button type="submit">회원가입</Button>
              {password && !mismatchError && '비밀번호가 다릅니다!'}
            </Form>
            <Horizon>
              <Hr />
              <div style={{ padding: '0 20px' }}>또는</div>
              <Hr />
            </Horizon>
            <Button>네이버로 계속</Button>
            <Button>카카오로 계속</Button>
            이미 Loatus 계정이 있으신가요?
            <Link to="/login">로그인하러 가기</Link>
          </SignIn>
        )}
      </Page>
      <ToastContainer />
    </Root>
  );
};

export default Signup;
