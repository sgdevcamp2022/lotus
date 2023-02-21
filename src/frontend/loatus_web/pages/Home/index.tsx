import React, { useCallback } from 'react';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useCookies } from 'react-cookie';

const Home = () => {
  const [cookie, setCookie] = useCookies(['accessToken']);
  return (
    <>
      <section>모집</section>
      <section>오늘 할 일</section>
      <section>공지</section>
      <section>
        <h1>기능테스트</h1>
        <Button
          onClick={() => {
            return;
          }}
        >
          가입하기
        </Button>
      </section>
    </>
  );
};

export default Home;
