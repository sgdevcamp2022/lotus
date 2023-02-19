import React, { useCallback } from 'react';
import { lostarkInfo } from '@typings/db';
import { Button, Card, CardActions, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import axios from 'axios';
import useToken from '@hooks/useToken';
import { useCookies } from 'react-cookie';
import useSWRRetry from '@hooks/useSWRRetry';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';

const example = [1, 2, 3, 4];

const CharacterSelect = (props: { gameInfo: lostarkInfo[] }) => {
  const navigate = useNavigate();
  const [accessToken, setAccessToken] = useToken();
  const [token] = useCookies(['refreshToken']);
  const { data: userData, error, mutate } = useSWRRetry('/auth/my', accessToken, setAccessToken, token.refreshToken);
  const onClickSetCharacter = useCallback((characterName: string) => {
    //TODO url 완성
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
  return (
    <Grid container width={'1000px'}>
      {props.gameInfo.map((info, key) => (
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
      {example.map((info, key) => (
        <Grid item xs={6} key={key}>
          <Card>
            <CardMedia
              sx={{ height: 140 }}
              image="/static/images/cards/contemplative-reptile.jpg"
              title="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                11{/*{`${info.ServerName} @ ${info.CharacterName}`}*/}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                22{/*{`${info.CharacterClassName} / Lv.${info.CharacterLevel}`}*/}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">등록하기</Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default CharacterSelect;
