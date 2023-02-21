import React, { FC, useCallback } from 'react';
import { FilledInput, FormControl, IconButton, InputAdornment, TextField } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import useInput from '@hooks/useInput';
import { toast } from 'react-toastify';
import axios from 'axios';
import useSWRRetry from '@hooks/useSWRRetry';
import { IChat } from '@typings/partyDB';
import { useCookies } from 'react-cookie';

type Props = {
  url: string | undefined;
  name: string;
};

const ChatBox: FC<Props> = (data) => {
  const accessToken = localStorage.getItem('accessToken');
  const [token] = useCookies(['refreshToken']);
  const [comment, onChangeComment, setComment] = useInput('');
  const {
    data: ChatData,
    error: ChatError,
    mutate: ChatMutate,
  } = useSWRRetry<IChat[]>(
    data.url !== undefined
      ? process.env.REACT_APP_DB_HOST + `/api/channels/${data.url}/parties/${data.name}/chats?perPage=20&page=1`
      : null,
    token.refreshToken,
  );

  const onSubmitComment = useCallback(
    (e: any) => {
      e.preventDefault();
      if (!comment) {
        toast.error('메시지 내용이 없습니다');
        return;
      }
      axios
        .post(
          process.env.REACT_APP_DB_HOST + `/api/channels/${data.url}/parties/${data.name}/chats`,
          {
            content: comment,
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        )
        .then((res) => {
          ChatMutate();
          setComment('');
        })
        .catch((err) => {
          toast.error(err.message);
        });
    },
    [comment],
  );

  return (
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
  );
};

export default ChatBox;
