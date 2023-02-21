import React from 'react';
import List from '@mui/material/List';
import { Avatar, IconButton, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material';
import CommentIcon from '@mui/icons-material/Comment';
import { useCookies } from 'react-cookie';
import useSWRRetry from '@hooks/useSWRRetry';
import { IUser } from '@typings/db';
import { Party } from '@typings/partyDB';
import { useParams } from 'react-router';
import gravatar from 'gravatar';
import ReactTimeAgo from 'react-time-ago';

const PartyPage = () => {
  const accessToken = localStorage.getItem('accessToken');
  const [token] = useCookies(['refreshToken']);
  const { data: userData, error: userError, mutate: userMutate } = useSWRRetry<IUser>('/auth/my', token.refreshToken);
  const params = useParams();
  const {
    data: partiesData,
    error: partiesError,
    mutate: partiesMutate,
  } = useSWRRetry<Party[]>(`/api/channels/${params.url}/parties`, token.refreshToken);

  return (
    <List>
      {partiesData?.map((party) => (
        <ListItem
          alignItems="flex-start"
          secondaryAction={
            <IconButton edge={'end'} aria-label={'comments'}>
              <CommentIcon />
            </IconButton>
          }
        >
          <ListItemAvatar>
            <Avatar alt={party.Owner.nickname} src={party.Owner.profileImage || gravatar.url(party.Owner.email)} />
          </ListItemAvatar>
          <ListItemText
            primary={<React.Fragment>{party.name}</React.Fragment>}
            secondary={
              <React.Fragment>
                <Typography sx={{ display: 'inline' }} component="span" variant="body2" color="text.primary">
                  {party.Owner.characterName || party.Owner.nickname}
                </Typography>
                <Typography variant={'body2'}></Typography>
                <Typography>
                  <ReactTimeAgo date={party.createdAt} />
                </Typography>
              </React.Fragment>
            }
          />
        </ListItem>
      ))}
    </List>
  );
};

export default PartyPage;
