import React, { useCallback, useEffect, useState } from 'react';
import { APIItem, lostarkInfo } from '@typings/db';
import { Button, Card, CardActions, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import axios, { AxiosResponse } from 'axios';
import useToken from '@hooks/useToken';
import { useCookies } from 'react-cookie';
import useSWRRetry from '@hooks/useSWRRetry';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';
import useTokenAxios from '@hooks/useTokenAxios';
import { Navigate } from 'react-router-dom';

const example = [1, 2, 3, 4];

const CharacterSelect = () => {
  const navigate = useNavigate();
  const accessToken = localStorage.getItem('accessToken');
  const [token] = useCookies(['refreshToken']);
  const { data: userData, error, mutate } = useSWRRetry('/auth/my', token.refreshToken);
  const {
    data: randomCode,
    error: randomCodeError,
    mutate: randomCodeMutate,
  } = useSWRRetry('/auth/randomcode', token.refreshToken);
  const [gameInfo, setGameInfo] = useState<lostarkInfo[] | null>(null);
  const onClickSetCharacter = useCallback((characterName: string) => {
    axios
      .post(
        '/auth/',
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
          '/auth/stove',
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

  return (
    <Grid container width={'1000px'}>
      {gameInfo?.map((info, key) => (
        <Grid xs={6} item key={key}>
          <Card>
            <CardMedia
              sx={{ height: 140 }}
              image="/static/images/cards/contemplative-reptile.jpg"
              title="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {`${info.ServerName} @ ${info.CharacterName}`}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {`${info.CharacterClassName} / Lv.${info.CharacterLevel}`}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" onClick={() => onClickSetCharacter(info.CharacterName)}>
                등록하기
              </Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default CharacterSelect;
