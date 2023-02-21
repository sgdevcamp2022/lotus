import React, { useCallback, useContext, useState } from 'react';
import { Button, Form, Nav } from 'react-bootstrap';
import useInput from '@hooks/useInput';
import useSWR from 'swr';
import { APIItem, IUser } from '@typings/db';
import fetcher from '@utils/fetcher';
import { toast } from 'react-toastify';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import useToken from '@hooks/useToken';
import useSWRRetry from '@hooks/useSWRRetry';
import { useCookies } from 'react-cookie';
import useTokenAxios from '@hooks/useTokenAxios';

const PostWrite = () => {
  const [accessToken, setAccessToken] = useToken();
  const [token] = useCookies(['refreshToken']);
  const { data: userData, error, mutate } = useSWRRetry('/auth/my', accessToken, setAccessToken, token.refreshToken);
  const [title, onChangeTitle, setTitle] = useInput('');
  const [content, onChangeContent, setContent] = useInput('');
  const [postSuccess, setPostSuccess] = useState(false);
  const onSubmitPost = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      await useTokenAxios(accessToken, setAccessToken, token.refreshToken)
        .post(
          '/post/regist/',
          {
            title,
            content,
          },
          {
            withCredentials: true,
            headers: {
              Authorization: 'Bearer ' + accessToken,
            },
          },
        )
        .then((response) => {
          if (response.data.code === 200) {
            toast.success('글쓰기가 성공했습니다.', {
              position: 'top-right',
            });
            setTitle('');
            setContent('');
            setPostSuccess(true);
          } else {
            toast.error('글쓰기가 실패했습니다.', {
              position: 'top-right',
            });
          }
        })
        .catch((error) => {
          toast.error('글쓰기가 실패했습니다.', {
            position: 'top-right',
          });
        });
    },
    [title, content],
  );

  if (!userData) {
    toast.error('로그인이 필요합니다!', {
      position: 'top-right',
    });
    return <Navigate to={'/board/lists'} replace />;
  } else if (postSuccess) {
    return <Navigate to={'/board/lists'} replace />;
  }

  return (
    <>
      <Form onSubmit={onSubmitPost}>
        <Form.Group className="mb-3" controlId="postForm.ControlInput">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="title"
            placeholder="제목을 입력해 주세요"
            value={title}
            onChange={onChangeTitle}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="postForm.ControlTextarea">
          <Form.Label>Content</Form.Label>
          <Form.Control as="textarea" rows={10} value={content} onChange={onChangeContent} required />
        </Form.Group>
        <Button href={'/board/lists'}>취소</Button>
        <Button type="submit">등록</Button>
      </Form>
    </>
  );
};

export default PostWrite;
