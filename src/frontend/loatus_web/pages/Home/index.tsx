import React, { useCallback } from 'react';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import { toast } from 'react-toastify';
const Home = () => {
  return (
    <>
      <section>모집</section>
      <section>오늘 할 일</section>
      <section>공지</section>
      <section>
        <h1>기능테스트</h1>
        <Button
          onClick={() => {
            axios
              .post(
                '/user/update/maincharacter',
                {
                  characterName: '초록눈의조안녕',
                },
                {
                  headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                  },
                },
              )
              .then((res) => {
                toast.success(res.data.message);
              })
              .catch((err) => {
                toast.error(err.message, {
                  position: 'top-right',
                });
              });
          }}
        >
          가입하기
        </Button>
      </section>
    </>
  );
};

export default Home;
