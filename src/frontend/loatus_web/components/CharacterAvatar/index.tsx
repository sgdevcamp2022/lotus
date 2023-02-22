import React, { FC } from 'react';
import gravatar from 'gravatar';
import { Avatar } from '@mui/material';
import { IUser } from '@typings/db';
import { useCookies } from 'react-cookie';
import useTokenAxios from '@hooks/useTokenAxios';
import { toast } from 'react-toastify';

type Props = {
  user: IUser;
};

const CharacterAvatar: FC<Props> = (Props) => {
  const [token] = useCookies(['refreshToken']);
  return (
    <Avatar
      src={Props.user.profileImage || gravatar.url(Props.user.email, { d: 'retro' })}
      onClick={() => {
        useTokenAxios(token.refreshToken)
          .post(process.env.REACT_APP_DB_HOST + '/friend/request', {
            // .post('/friend/request', {
            toUserId: Props.user.userId,
          })
          .then((res) => {
            toast.success(res.data.message);
          })
          .catch((err) => {
            toast.error(err.message);
          });
      }}
    />
  );
};

export default CharacterAvatar;
