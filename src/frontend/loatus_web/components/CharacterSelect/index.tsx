import React, { useCallback, useEffect, useState } from 'react';
import { APIItem, lostarkInfo } from '@typings/db';
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Typography,
} from '@mui/material';
import axios, { AxiosResponse } from 'axios';
import useToken from '@hooks/useToken';
import { useCookies } from 'react-cookie';
import useSWRRetry from '@hooks/useSWRRetry';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';
import useTokenAxios from '@hooks/useTokenAxios';
import { Navigate } from 'react-router-dom';
import List from '@mui/material/List';
import { getClassThumbImg } from '@utils/getClassImg';
import gravatar from 'gravatar';

const CharacterSelect = () => {
  const navigate = useNavigate();
  const accessToken = localStorage.getItem('accessToken');
  const [token] = useCookies(['refreshToken']);
  const { data: userData, error, mutate } = useSWRRetry(process.env.REACT_APP_DB_HOST + '/auth/my', token.refreshToken);
  const {
    data: randomCode,
    error: randomCodeError,
    mutate: randomCodeMutate,
  } = useSWRRetry(process.env.REACT_APP_DB_HOST + '/auth/randomcode', token.refreshToken);
  const [gameInfo, setGameInfo] = useState<lostarkInfo[] | null>(null);
  const onClickSetCharacter = useCallback((characterName: string) => {
    axios
      .post(
        process.env.REACT_APP_DB_HOST + '/user/update/maincharacter',
        {
          characterName: characterName,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      )
      .then((res) => {
        toast.success(res.data.message);
        mutate();
        navigate('/');
      })
      .catch((err) => {
        toast.error(err.message, {
          position: 'top-right',
        });
      });
  }, []);

  useEffect(() => {
    if (userData?.stoveNo && randomCode) {
      useTokenAxios(token.refreshToken)
        .post(
          process.env.REACT_APP_DB_HOST + '/auth/stove',
          {
            randomCode,
            stoveUrl: `https://timeline.onstove.com/${userData.stoveNo}`,
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        )
        .then((res) => {
          setGameInfo(res.data.data);
        })
        .catch((err) => {
          toast.error(err.message);
        });
    }
  }, [randomCode]);

  if (!userData) {
    return <Navigate to={'/'} />;
  }

  if (!gameInfo) {
  }

  return (
    <Grid container width={'1000px'}>
      <Typography component={'h3'} variant={'h3'}>
        대표로 설정하고 싶은 캐릭터를 클릭해주세요.
      </Typography>
      <List sx={{ justifyContent: 'center', width: '100%' }}>
        {gameInfo?.map((info, key) => (
          <ListItem sx={{ width: '30%' }}>
            <ListItemButton
              sx={{
                bgcolor: '#555',
                borderRadius: '10px',
                ':hover': { bgcolor: '#777' },
                color: '#fff',
                width: '350px',
              }}
              onClick={() => onClickSetCharacter(info.CharacterName)}
            >
              <ListItemAvatar>
                <Avatar
                  src={getClassThumbImg(info.CharacterClassName) || gravatar.url('nothing@noting.com')}
                  alt={info.CharacterClassName}
                />
              </ListItemAvatar>
              <ListItemText
                primary={info.CharacterName}
                secondary={
                  <Typography component={'span'} variant={'body2'}>
                    {`${info.ServerName} @ Lv.${info.CharacterLevel}`}
                  </Typography>
                }
              ></ListItemText>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Grid>
  );
};

export default CharacterSelect;
