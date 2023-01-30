import React, { ChangeEvent, FormEvent, useCallback, useState } from 'react';
import { Button, Header, Horizon, Hr, Input, Page, PageHead, Root, SignIn } from '@pages/Login/styles';
import { Link } from 'react-router-dom';
import useInput from '@hooks/useInput';
import axios from 'axios';

const Signup = () => {
  const [email, onChangeEmail, setEmail] = useInput('');
  const [password, , setPassword] = useInput('');
  const [passwordCheck, , setPasswordCheck] = useInput('');
  const [nickname, onChangeNickname, setNickname] = useInput('');
  const [mismatchError, setMismatchError] = useState(false);
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
        .post('http://localhost:8080/api/signup', {
          auth: '',
          email: { email },
          nickname: { nickname },
          password: { password },
          profile_image: '',
        })
        .then((response) => {
          console.log(response.data);
          setEmail('');
          setPassword('');
          setPasswordCheck('');
          setNickname('');
        })
        .catch((error) => {
          console.dir(error);
        });
    },
    [email, password, passwordCheck, nickname],
  );

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
        <PageHead>회원가입</PageHead>
        <SignIn>
          <form onSubmit={onSubmitSignup}>
            <label id="email-label">
              <span>이메일</span>
              <Input required placeholder={'name@email.com'} type="email" value={email} onChange={onChangeEmail} />
            </label>
            <label id="password-label">
              <span>비밀번호</span>
              <Input required type="password" value={password} onChange={onChangePassword} />
            </label>
            <label id="password-check-label">
              <span>비밀번호 확인</span>
              <Input type="password" value={passwordCheck} onChange={onChangePasswordCheck} />
            </label>
            <label id="nickname-label">
              <span>닉네임</span>
              <Input required type="text" value={nickname} onChange={onChangeNickname} />
            </label>
            <Button type="submit">회원가입</Button>
            {password && !mismatchError && '비밀번호가 다릅니다'}
          </form>
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
      </Page>
    </Root>
  );
};

export default Signup;
