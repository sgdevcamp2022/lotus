import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import useInput from '@hooks/useInput';
import { toast } from 'react-toastify';
import { Navigate } from 'react-router-dom';
import useSWRRetry from '@hooks/useSWRRetry';
import { useCookies } from 'react-cookie';
import useTokenAxios from '@hooks/useTokenAxios';
import axios, { AxiosResponse } from 'axios';
import { useNavigate, useParams } from 'react-router';
import { APIItem, IPost } from '@typings/db';
import { Button } from '@mui/material';

const PostWrite = () => {
  const navigate = useNavigate();
  const params = useParams();
  const accessToken = localStorage.getItem('accessToken');
  const [token] = useCookies(['refreshToken']);
  const { data: userData, error, mutate } = useSWRRetry(process.env.REACT_APP_DB_HOST + '/auth/my', token.refreshToken);
  const [title, onChangeTitle, setTitle] = useInput('');
  const [content, onChangeContent, setContent] = useInput('');
  const [author, setAuthor] = useState('');

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_DB_HOST + `/post/${params.id}`)
      .then((res: AxiosResponse<APIItem<IPost[]>>) => {
        console.log(res.data.data[0].fields);
        setAuthor(res.data.data[0].fields.author);
        setTitle(res.data.data[0].fields.title);
        setContent(res.data.data[0].fields.content);
      })
      .catch((err) => {
        toast.error(err.message);
      });
  }, []);

  const onSubmitPost = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      await useTokenAxios(token.refreshToken)
        .post(
          process.env.REACT_APP_DB_HOST + `/post/edit/${params.id}/`,
          {
            title,
            content,
          },
          {
            withCredentials: false,
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
            navigate(`/board/${params.id}`);
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
    toast.error('권한이 없습니다', {
      position: 'top-right',
    });
    return <Navigate to={'/board/lists'} replace />;
  } else if (author && author !== userData.nickname) {
    toast.error('권한이 없습니다', {
      position: 'top-right',
    });
    return <Navigate to={'/board/lists'} replace />;
  }

  return (
    <>
      <Form onSubmit={onSubmitPost} style={{ width: '600px' }}>
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
        <Button onClick={() => navigate(-1)}>취소</Button>
        <Button type="submit">등록</Button>
      </Form>
    </>
  );
};

export default PostWrite;
