import React, { FC, memo } from 'react';
import { IChat } from '@typings/partyDB';
import Box from '@mui/material/Box';
import { Avatar, Grid, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material';
import gravatar from 'gravatar';
import ReactTimeAgo from 'react-time-ago';

type Props = {
  data: IChat;
};

const Chat: FC<Props> = ({ data }) => {
  return (
    <ListItem>
      <ListItemAvatar>
        <Avatar src={data.User.profileImage || gravatar.url(data.User.email, { d: 'retro' })} />
      </ListItemAvatar>
      <ListItemText
        primary={data.content}
        secondary={
          <React.Fragment>
            <Typography sx={{ display: 'inline' }} component="span" variant="body2" color="text.primary">
              {data.User.characterName || data.User.nickname}
            </Typography>
            - <ReactTimeAgo date={data.createdAt} />
          </React.Fragment>
        }
      />
    </ListItem>
  );
};

export default memo(Chat);
