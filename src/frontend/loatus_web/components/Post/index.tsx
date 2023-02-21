import React, { useCallback } from 'react';
import { IPost } from '@typings/db';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import { useNavigate, useParams } from 'react-router';
import {
  Avatar,
  Badge,
  Button,
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
import SendIcon from '@mui/icons-material/Send';
import List from '@mui/material/List';
import { ThumbUp } from '@mui/icons-material';
import useInput from '@hooks/useInput';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import useSWRRetry from '@hooks/useSWRRetry';
import { toast } from 'react-toastify';
import ReactTimeAgo from 'react-time-ago';

const Post = () => {
  const navigate = useNavigate();
  const params = useParams();
  const {
    data: PostData,
    error: postError,
    mutate: postMutate,
  } = useSWR<IPost[]>(process.env.REACT_APP_DB_HOST + `/post/${params.id}`, fetcher);
  const accessToken = localStorage.getItem('accessToken');
  const [token] = useCookies(['refreshToken']);
  const { data: userData, error, mutate } = useSWRRetry(process.env.REACT_APP_DB_HOST + '/auth/my', token.refreshToken);
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
          process.env.REACT_APP_DB_HOST + '/post/comment/',
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
      .get(process.env.REACT_APP_DB_HOST + `/post/like/${params.id}`, {
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
          <Button onClick={() => navigate(-1)}>뒤로가기</Button>
        </Box>
        <Grid container marginTop={'30px'}>
          <Grid xs={4} item>
            {PostData[0].fields.author}
          </Grid>
          <Grid xs={8} item textAlign={'right'}>
            <ReactTimeAgo date={PostData[0].fields.published_date} />
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
            PostData[0].fields.comments.map((comment, key) => (
              <ListItem alignItems="flex-start" key={key}>
                <ListItemAvatar>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                </ListItemAvatar>
                <ListItemText
                  primary={comment.cur_user_comment}
                  secondary={
                    <React.Fragment>
                      <Typography sx={{ display: 'inline' }} component="span" variant="body2" color="text.primary">
                        {comment.cur_user_nickname}
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
