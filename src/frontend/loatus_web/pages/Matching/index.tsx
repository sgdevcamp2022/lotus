import { Card, CardActions, CardContent, CardMedia, Grid } from '@mui/material';
import React, { useCallback } from 'react';
import { raidInfo } from '../../config/raid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import useTokenAxios from '@hooks/useTokenAxios';
import { useCookies } from 'react-cookie';
import { toast } from 'react-toastify';

const Matching = () => {
  const [token] = useCookies(['refreshToken']);

  const onClickEnroll = useCallback((id: number) => {
    useTokenAxios(token.refreshToken)
      .post(process.env.REACT_APP_DB_HOST + `/matching/enroll/${id}/`)
      .then((res) => {
        toast.info(res.data.message);
        if (res.data.data !== undefined) {
          useTokenAxios(token.refreshToken)
            .post(process.env.REACT_APP_DB_HOST + `/api/channels/raid/parties`, {
              name: res.data.data.data.raid_name + res.data.data.data.userid_list[0],
            })
            .then((res2) => {
              res.data.data.data.userid_list.map((userid: string) => {
                useTokenAxios(token.refreshToken)
                  .post(
                    process.env.REACT_APP_DB_HOST +
                      `/api/channels/raid/parties/${
                        res.data.data.data.raid_name + res.data.data.data.userid_list[0]
                      }/${userid}`,
                  )
                  .then((res3) => {
                    toast.success(res3.data.message);
                  })
                  .catch((err3) => {
                    toast.error(err3.message);
                  });
              });
            })
            .catch((err2) => {
              toast.error(err2.message);
            });
        }
      })
      .catch((err) => {
        toast.error(err.message);
      });
  }, []);

  const onClickResult = useCallback(() => {
    useTokenAxios(token.refreshToken)
      .post(process.env.REACT_APP_DB_HOST + `/matching/result/`)
      .then((res) => {
        console.log(res.data);
        toast.success(res.data.message);
      })
      .catch((err) => {
        toast.error(err.message);
      });
  }, []);

  return (
    <Grid container width={1200}>
      {raidInfo.map((raid, key) => (
        <Grid item xs={4} key={key}>
          <Card sx={{ maxWidth: 345 }}>
            <CardMedia sx={{ height: 140 }} image={raid.imageUrl} title={raid.raidName} />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {raid.korName}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {raid.option}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" onClick={() => onClickEnroll(key + 1)}>
                레이드 매칭
              </Button>
              <Button size="small" onClick={onClickResult}>
                매칭 조회
              </Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default Matching;
