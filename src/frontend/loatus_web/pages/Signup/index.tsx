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
  } = useSWR<IUser | null>(accessToken ? [process.env.REACT_APP_DB_HOST + '/auth/my', accessToken] : null, fetcher);
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
        .post(process.env.REACT_APP_DB_HOST + '/user/signup', {
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
          toast.error('????????? ??????????????????.\n???????????? ????????? ?????????!', {
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
          <h1 style={{ textAlign: 'center', fontFamily: 'Noto Sans KR, sans-serif' }}>LOATUS</h1>
        </div>
        <div className="right-col"></div>
      </Header>
      <Page>
        <PageHead>????????????{signupSuccess && '??? ??????????????????!'}</PageHead>
        {signupSuccess ? (
          <div>
            <h4>?????? ?????? ???????????? ?????????</h4>
            <Button>
              <Link to={'/login'}>????????? ?????? ??????</Link>
            </Button>
          </div>
        ) : (
          <SignIn>
            <Form onSubmit={onSubmitSignup}>
              <Form.Label id="email-label">?????????</Form.Label>
              <Input required placeholder={'name@email.com'} type="email" value={email} onChange={onChangeEmail} />
              <Form.Label id="password-label">????????????</Form.Label>
              <Input required type="password" value={password} onChange={onChangePassword} />
              <Form.Label id="password-check-label">???????????? ??????</Form.Label>
              <Input required type="password" value={passwordCheck} onChange={onChangePasswordCheck} />
              <Form.Label id="nickname-label">?????????</Form.Label>
              <Input required type="text" value={nickname} onChange={onChangeNickname} />
              <Button type="submit">????????????</Button>
              {password && !mismatchError && '??????????????? ????????????!'}
            </Form>
            <Horizon>
              <Hr />
              <div style={{ padding: '0 20px' }}>??????</div>
              <Hr />
            </Horizon>
            <Button>???????????? ??????</Button>
            <Button>???????????? ??????</Button>
            ?????? Loatus ????????? ????????????????
            <Link to="/login">??????????????? ??????</Link>
          </SignIn>
        )}
      </Page>
      <ToastContainer />
    </Root>
  );
};

export default Signup;
