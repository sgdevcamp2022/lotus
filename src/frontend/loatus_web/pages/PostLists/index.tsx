import React, { useCallback, useEffect, useState } from 'react';
import { Carousel, Col, Form, InputGroup, Row, Table } from 'react-bootstrap';
import { Link, useSearchParams } from 'react-router-dom';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import { APIItem, IPost, IUser } from '@typings/db';
import makedate from '@utils/makedate';
import axios from 'axios';
import useToken from '@hooks/useToken';
import { Button, Grid, IconButton, PaginationItem, Paper, Stack, Typography } from '@mui/material';
import { Pagination } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';

const PostLists = () => {
  const [accessToken] = useToken();
  const [params, setParams] = useSearchParams();
  const { data: PostData, error, mutate } = useSWR<IPost[]>([`/post/?page=${params.get('page') || 1}`], fetcher);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setParams(`page=${value}`);
  };

  const onClickDelete = useCallback((post: IPost) => {
    axios
      .delete(`/post/delete/${post.pk}`, {
        headers: {
          Authorization: 'Bearer ' + accessToken,
        },
      })
      .then((response) => {
        mutate();
      })
      .catch((error) => {});
  }, []);

  const onClickEdit = useCallback(async (post: IPost) => {
    //모달 실행 후 입력 받기
    await axios.post(`/post/edit/${post.pk}`, {});
  }, []);

  return (
    <div>
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
        &nbsp; 안녕하세요 또 만났네요
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
      <Grid textAlign={'right'}>
        <Button component={Link} to={'/board/write'} color={'inherit'} variant="outlined" startIcon={<AddIcon />}>
          글쓰기
        </Button>
      </Grid>
      <Table hover style={{ textAlign: 'center' }}>
        <thead style={{ fontFamily: 'Noto Sans KR, sans-serif' }}>
          <tr>
            <th>No</th>
            <th>TITLE</th>
            <th>AUTHOR</th>
            <th>CONTENT</th>
            <th>PUBLISHED_DATE</th>
            <th>MANAGEMENT</th>
          </tr>
        </thead>
        <tbody>
          {PostData?.map((post, key) => {
            return (
              <tr>
                <td>{key}</td>
                <td>{post.fields.title}</td>
                <td>{post.fields.author}</td>
                <td>{post.fields.content}</td>
                <td>{makedate(post.fields.published_date)}</td>
                <td>
                  <IconButton onClick={() => onClickEdit(post)} color={'inherit'}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => onClickDelete(post)} color={'inherit'}>
                    <DeleteIcon />
                  </IconButton>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <Paper
        elevation={3}
        sx={{
          width: 500,
          margin: 'auto',
          alignContent: 'center',
          textAlign: 'center',
          height: 100,
        }}
      >
        <Typography sx={{ display: 'block' }}>Page: {params.get('page')}</Typography>
        <Pagination
          style={{ color: 'black', justifyContent: 'center', display: 'flex' }}
          count={10}
          page={Number(params.get('page'))}
          onChange={handleChange}
          color={'primary'}
          variant={'outlined'}
          shape={'rounded'}
          renderItem={(item) => <PaginationItem component={Link} to={`/board/lists?page=${item.page}`} {...item} />}
        />
      </Paper>
    </div>
  );
};

export default PostLists;
