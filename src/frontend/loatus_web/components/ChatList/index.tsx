import React, { FC } from 'react';
import useSWRRetry from '@hooks/useSWRRetry';
import { useCookies } from 'react-cookie';
import { IChat } from '@typings/partyDB';
import Chat from '@components/Chat';
import List from '@mui/material/List';
import Scrollbars from 'react-custom-scrollbars-2';
import dayjs from 'dayjs';

type Props = {
  url: string | undefined;
  name: string;
};

const ChatList: FC<Props> = (data) => {
  const [token] = useCookies(['refreshToken']);
  const {
    data: ChatData,
    error: ChatError,
    mutate: ChatMutate,
  } = useSWRRetry<IChat[]>(
    data.url !== undefined ? `/api/channels/${data.url}/parties/${data.name}/chats?perPage=20&page=1` : null,
    token.refreshToken,
  );

  return (
    <List sx={{ height: '500px', overflow: 'auto' }}>
      {ChatData?.sort((a, b) => dayjs(a.createdAt).diff(b.createdAt)).map((chat, key) => (
        <Chat data={chat} key={key}></Chat>
      ))}
    </List>
  );
};

export default ChatList;
