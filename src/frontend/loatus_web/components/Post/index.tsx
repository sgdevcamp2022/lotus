import React, { useCallback } from 'react';
import { IPost } from '@typings/db';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import { useParams } from 'react-router';
import {
  Avatar,
  Badge,
  Divider,
  FilledInput,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import Box from '@mui/material/Box';
import makedate from '@utils/makedate';
import SendIcon from '@mui/icons-material/Send';
import List from '@mui/material/List';
import { ThumbUp } from '@mui/icons-material';
import useInput from '@hooks/useInput';
import axios from 'axios';
import useToken from '@hooks/useToken';
import { useCookies } from 'react-cookie';
import useSWRRetry from '@hooks/useSWRRetry';
import { toast } from 'react-toastify';
const Post = () => {
  const params = useParams();
  const { data: PostData, error: postError, mutate: postMutate } = useSWR<IPost[]>([`/post/${params.id}`], fetcher);
  const accessToken = localStorage.getItem('accessToken');
  const [token] = useCookies(['refreshToken']);
  const { data: userData, error, mutate } = useSWRRetry('/auth/my', token.refreshToken);
  const [comment, onChangeComment, setComment] = useInput('');

  const onSubmitComment = useCallback(
    (e: any) => {
      e.preventDefault();
      if (!comment) {
        toast.error('빈 댓글을 등록할 수 없습니다.', {
          position: 'top-right',
        });
        return;
      }
      if (!userData) {
        toast.error('로그인 후에 이용할 수 있습니다.', {
          position: 'top-right',
        });
        return;
      }
      axios
        .post(
          '/post/comment/',
          {
            post: params.id,
            text: comment,
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        )
        .then((res) => {
          postMutate();
          setComment('');
        })
        .catch((err) => {
          toast.error(err.message, {
            position: 'top-right',
          });
        });
    },
    [comment, params, userData, accessToken],
  );

  const onClickLike = useCallback(() => {
    if (!userData) {
      toast.error('로그인 후에 이용할 수 있습니다.', {
        position: 'top-right',
      });
      return;
    }

    axios
      .get(`/post/like/${params.id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        postMutate();
      })
      .catch((err) => {
        toast.error(err.message, {
          position: 'top-right',
        });
      });
  }, [userData, accessToken, params]);

  if (PostData)
    return (
      <>
        <Box width={1000}>
          <Typography variant={'h2'} component={'h2'} fontFamily={'Noto Sans KR, sans-serif'}>
            {PostData && PostData[0].fields.title}
            <Badge badgeContent={PostData && PostData[0].fields.like.length} color={'success'}>
              <IconButton onClick={onClickLike}>
                <ThumbUp></ThumbUp>
              </IconButton>
            </Badge>
          </Typography>
        </Box>
        <Grid container marginTop={'30px'}>
          <Grid xs={4} item>
            {PostData[0].fields.author}
          </Grid>
          <Grid xs={8} item textAlign={'right'}>
            {makedate(PostData[0].fields.published_date)}
          </Grid>
        </Grid>
        <Paper elevation={3} sx={{ height: '350px', marginTop: '20px', padding: '30px', marginBottom: '20px' }}>
          <Box>{PostData && PostData[0].fields.content}</Box>
        </Paper>
        <div>
          <form onSubmit={onSubmitComment}>
            <FormControl fullWidth variant="filled">
              <FilledInput
                fullWidth
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton type={'submit'}>
                      <SendIcon />
                    </IconButton>
                  </InputAdornment>
                }
                value={comment}
                onChange={onChangeComment}
              />
            </FormControl>
          </form>
        </div>
        <Divider />
        <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
          {typeof PostData[0].fields.comments !== 'string' &&
            PostData[0].fields.comments.map((comment) => (
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                </ListItemAvatar>
                <ListItemText
                  primary={comment.content}
                  secondary={
                    <React.Fragment>
                      <Typography sx={{ display: 'inline' }} component="span" variant="body2" color="text.primary">
                        {comment.author}
                      </Typography>
                    </React.Fragment>
                  }
                />
              </ListItem>
            ))}
        </List>
      </>
    );
  else return null;
};

export default Post;
