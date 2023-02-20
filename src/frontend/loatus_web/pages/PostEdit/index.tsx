import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Button, Form, Nav } from 'react-bootstrap';
import useInput from '@hooks/useInput';
import { toast } from 'react-toastify';
import { Navigate } from 'react-router-dom';
import useSWRRetry from '@hooks/useSWRRetry';
import { useCookies } from 'react-cookie';
import useTokenAxios from '@hooks/useTokenAxios';
import axios, { AxiosResponse } from 'axios';
import { useNavigate, useParams } from 'react-router';
import useSWR from 'swr';
import { APIItem, IPost } from '@typings/db';
import fetcher from '@utils/fetcher';

const PostWrite = () => {
  const navigate = useNavigate();
  const params = useParams();
  const accessToken = localStorage.getItem('accessToken');
  const [token] = useCookies(['refreshToken']);
  const { data: userData, error, mutate } = useSWRRetry('/auth/my', token.refreshToken);
  const [title, onChangeTitle, setTitle] = useInput('');
  const [content, onChangeContent, setContent] = useInput('');
  const [author, setAuthor] = useState(0);

  useEffect(() => {
    axios
      .get(`/post/${params.id}`)
      .then((res: AxiosResponse<APIItem<IPost[]>>) => {
        setTitle(res.data.data[0].fields.title);
        setContent(res.data.data[0].fields.content);
        setAuthor(+res.data.data[0].fields.author);
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
          `/post/edit/${params.id}`,
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

  if (!userData || author !== userData.userid) {
    toast.error('권한이 없습니다', {
      position: 'top-right',
    });
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
