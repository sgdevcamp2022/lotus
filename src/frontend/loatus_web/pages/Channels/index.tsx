import React, { useCallback, useState } from 'react';
import List from '@mui/material/List';
import { useCookies } from 'react-cookie';
import useSWRRetry from '@hooks/useSWRRetry';
import { IUser } from '@typings/db';
import { Channel } from '@typings/partyDB';
import { Outlet, useNavigate } from 'react-router';
import { ListItemButton, ListItemText } from '@mui/material';
import Typography from '@mui/material/Typography';

const Channels = () => {
  const navigate = useNavigate();
  const accessToken = localStorage.getItem('accessToken');
  const [token] = useCookies(['refreshToken']);
  const { data: userData, error: userError, mutate: userMutate } = useSWRRetry<IUser>('/auth/my', token.refreshToken);
  const {
    data: channels,
    error: channelsError,
    mutate: channelsMutate,
  } = useSWRRetry<Channel[]>('/api/channels', token.refreshToken);
  const [showPartyModal, setShowPartyModal] = useState(false);
  const [partyInfo, setPartyInfo] = useState(0);
  const toggleShowPartyModal = useCallback(() => {
    setPartyInfo(1);
    setShowPartyModal((prev) => !prev);
  }, []);

  const handleClose = useCallback(() => setShowPartyModal(false), []);

  return (
    <List sx={{ width: '500px', bgcolor: 'background.paper' }}>
      {channels?.map((channel, key) => (
        <ListItemButton
          key={key}
          sx={{ borderRadius: '10px', bgcolor: '#30343F', margin: '10px', color: 'white' }}
          onClick={() => navigate(`/channels/${channel.url}/parties`)}
        >
          <ListItemText primary={<Typography color={'white'}>{channel.name}</Typography>} />
        </ListItemButton>
      ))}
      <Outlet />
    </List>
  );
};

export default Channels;
