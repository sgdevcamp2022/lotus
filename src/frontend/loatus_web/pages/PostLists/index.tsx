import React, { useCallback, useEffect, useState } from 'react';
import { Carousel, Col, Form, InputGroup, Row, Table } from 'react-bootstrap';
import { Link, useSearchParams } from 'react-router-dom';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import { APIItem, IPost, IUser } from '@typings/db';
import axios from 'axios';
import {
  Button,
  CircularProgress,
  Grid,
  IconButton,
  PaginationItem,
  Paper,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material';
import { Pagination } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';
import ReactTimeAgo from 'react-time-ago';

const PostLists = () => {
  const navigate = useNavigate();
  const accessToken = localStorage.getItem('accessToken');
  const [params, setParams] = useSearchParams();
  const {
    data: PostData,
    error,
    mutate,
  } = useSWR<{ post: IPost[]; total: number }>(
    [process.env.REACT_APP_DB_HOST + `/post/?page=${params.get('page') || 1}`, accessToken],
    fetcher,
  );

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setParams(`page=${value}`);
  };

  const onClickDelete = useCallback((post: IPost) => {
    axios
      .delete(process.env.REACT_APP_DB_HOST + `/post/delete/${post.pk}/`, {
        headers: {
          Authorization: 'Bearer ' + accessToken,
        },
      })
      .then((response) => {
        if (response.data.code <= 300) {
          mutate();
          toast.success(response.data.message);
          return;
        }
        toast.error(response.data.message);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  }, []);

  const onClickEdit = useCallback(async (post: IPost) => {
    //모달 실행 후 입력 받기
    await axios
      .post(
        process.env.REACT_APP_DB_HOST + `/post/edit/${post.pk}/`,
        {
          title: '바뀌나요',
          content: '안바뀌나요',
        },
        {
          headers: {
            Authorization: 'Bearer ' + accessToken,
          },
        },
      )
      .then((response) => {
        if (response.data.code <= 300) {
          mutate();
          toast.success(response.data.message);
          return;
        }
        toast.error(response.data.message);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  }, []);

  return (
    <div>
      <Paper
        elevation={3}
        sx={{
          margin: 'auto',
          alignContent: 'center',
          textAlign: 'center',
          height: 500,
        }}
      >
        <Typography
          component="h1"
          sx={{
            fontFamily: 'Noto Sans KR, sans-serif',
            fontWeight: 900,
            lineHeight: 1.25,
            letterSpacing: '.9px',
            color: 'inherit',
            fontSize: '2.75rem',
          }}
        >
          <ThumbUpAltIcon sx={{ fontWeight: 900, fontSize: '2.75rem' }} />
          &nbsp; 안녕하세요
        </Typography>
        <Carousel style={{ margin: '25px' }}>
          <Carousel.Item>
            <img
              className={'d-block w-100'}
              src={
                'https://w.namu.la/s/bab5cf7fddc14b6dce8d59e30e25c79bc8519072a57745aaff59239866ea5d217e51fbc224204a65fcdfd52a68df5303696ff7e023e497364ab60c06e35513b9065accc0762ee92daeca448a9f842239c751f12326c0d80815c5c68cd6476c092c4f07c9ed90b8e65f2ec8c59b67059b'
              }
              width={'800'}
              height={'400'}
              alt={'First slide'}
            />
            <Carousel.Caption>
              <h3>글 쓸 사람</h3>
              <p>나야 나 나야 나</p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </Paper>
      <Grid textAlign={'right'} sx={{ paddingTop: '1rem' }}>
        <Button component={Link} to={'/board/write'} color={'primary'} variant="outlined" startIcon={<AddIcon />}>
          글쓰기
        </Button>
      </Grid>
      <Table hover style={{ textAlign: 'center' }}>
        <thead style={{ fontFamily: 'Noto Sans KR, sans-serif' }}>
          <tr>
            <th>No</th>
            <th>TITLE</th>
            <th>AUTHOR</th>
            <th>PUBLISHED_DATE</th>
            <th>MANAGEMENT</th>
          </tr>
        </thead>
        <tbody>
          {PostData ? (
            PostData.post.map((post, key) => {
              return (
                <tr key={key} onClick={() => navigate(`/board/${post.pk}`)}>
                  <td>{key}</td>
                  <td style={{ width: '600px' }}>{post.fields.title}</td>
                  <td>{post.fields.author}</td>
                  <td>
                    <ReactTimeAgo date={post.fields.published_date} />
                  </td>
                  <td>
                    <IconButton
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/board/edit/${post.pk}`);
                      }}
                      color={'inherit'}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      onClick={(e) => {
                        e.stopPropagation();
                        onClickDelete(post);
                      }}
                      color={'inherit'}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan={6}>
                <CircularProgress />
              </td>
            </tr>
          )}
        </tbody>
      </Table>
      {PostData && (
        <Pagination
          sx={{ justifyContent: 'center', display: 'flex' }}
          count={Math.trunc(PostData.total / 10) + (PostData.total % 10 && 1)}
          page={Number(params.get('page'))}
          onChange={handleChange}
          variant={'outlined'}
          color={'primary'}
          shape={'rounded'}
          defaultPage={0}
          renderItem={(item) => (
            <PaginationItem component={Link} to={`/board/lists?page=${item.page}`} {...item} sx={{ color: 'black' }} />
          )}
        />
      )}
    </div>
  );
};

export default PostLists;
