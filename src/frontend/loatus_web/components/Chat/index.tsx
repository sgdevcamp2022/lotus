import React, { FC, memo } from 'react';
import { IChat } from '@typings/partyDB';
import Box from '@mui/material/Box';
import { Avatar, Grid, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material';
import gravatar from 'gravatar';
import ReactTimeAgo from 'react-time-ago';
import CharacterAvatar from '@components/CharacterAvatar';

type Props = {
  data: IChat;
};

const Chat: FC<Props> = ({ data }) => {
  return (
    <ListItem>
      <ListItemAvatar>
        <CharacterAvatar user={data.User} />
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
