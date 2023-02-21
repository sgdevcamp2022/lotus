import React, { useCallback, useEffect, useState } from 'react';
import List from '@mui/material/List';
import {
  Avatar,
  Button,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Modal,
  SpeedDial,
  SpeedDialIcon,
  Tabs,
  TextField,
  Typography,
} from '@mui/material';
import CommentIcon from '@mui/icons-material/Comment';
import { useCookies } from 'react-cookie';
import useSWRRetry from '@hooks/useSWRRetry';
import { IUser } from '@typings/db';
import { Party } from '@typings/partyDB';
import { useParams } from 'react-router';
import gravatar from 'gravatar';
import ReactTimeAgo from 'react-time-ago';
import useSocket from '@hooks/useSocket';
import { ModalBox } from '@pages/PartyPage/styles';
import useInput from '@hooks/useInput';
import axios from 'axios';
import { toast } from 'react-toastify';
import ChatList from '@components/ChatList';
import ChatBox from '@components/ChatBox';
import { TabPane } from 'react-bootstrap';
import Box from '@mui/material/Box';

const PartyPage = () => {
  const accessToken = localStorage.getItem('accessToken');
  const [token] = useCookies(['refreshToken']);
  const { data: userData, error: userError, mutate: userMutate } = useSWRRetry<IUser>('/auth/my', token.refreshToken);
  const params = useParams();
  const [openPostParty, setOpenPostParty] = useState(false);
  const [openPartyChat, setOpenPartyChat] = useState(false);
  const [partyName, onChangePartyName, setPartyName] = useInput('');
  const [chatName, setChatName] = useState('');
  const {
    data: partiesData,
    error: partiesError,
    mutate: partiesMutate,
  } = useSWRRetry<Party[]>(process.env.REACT_APP_DB_HOST + `/api/channels/${params.url}/parties`, token.refreshToken);
  const {
    data: myPartiesData,
    error: myPartiesError,
    mutate: myPartiesMutate,
  } = useSWRRetry<Party[]>(
    userData ? process.env.REACT_APP_DB_HOST + `/api/channels/${params.url}/parties/my/${userData.userId}` : null,
    token.refreshToken,
  );
  const [socket, disconnect] = useSocket(params.url);

  const handleClose = useCallback(() => {
    setOpenPostParty(false);
    setOpenPartyChat(false);
    setPartyName('');
  }, []);

  const onSubmitParty = useCallback(
    (e: any) => {
      e.preventDefault();
      if (!partyName) {
        toast.error('파티 제목을 입력해 주세요.');
        return;
      }
      axios
        .post(
          process.env.REACT_APP_DB_HOST + `/api/channels/${params.url}/parties`,
          {
            name: partyName,
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        )
        .then((res) => {
          myPartiesMutate();
          partiesMutate();
          toast.success(res.data.message);
          handleClose();
          setPartyName('');
        })
        .catch((err) => {
          toast.error(err.message);
        });
    },
    [partyName],
  );

  useEffect(() => {
    if (myPartiesData && userData && socket) {
      socket.emit('login', { id: userData.userId, parties: myPartiesData.map((v) => v.id) });
    }
  }, [socket, myPartiesData, userData]);

  useEffect(() => {
    return () => {
      disconnect();
    };
  }, [params.url, disconnect]);

  return (
    <Box height={'600px'} overflow={'auto'}>
      <List>
        {partiesData?.map((party, key) => (
          <ListItem
            key={key}
            alignItems="flex-start"
            secondaryAction={
              <IconButton
                edge={'end'}
                aria-label={'comments'}
                onClick={() => {
                  setOpenPartyChat(true);
                  setPartyName(party.name);
                }}
              >
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
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{ position: 'absolute', bottom: 50, right: 50 }}
        icon={<SpeedDialIcon />}
        onClick={() => {
          setOpenPostParty(true);
        }}
      />
      <Modal
        open={openPostParty}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <ModalBox position={'absolute'}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            파티 정보를 입력하세요.
          </Typography>
          <form onSubmit={onSubmitParty}>
            <TextField
              id="standard-basic"
              label="파티제목"
              variant="standard"
              value={partyName}
              onChange={onChangePartyName}
            />
            <Button type="submit">생성하기</Button>
          </form>
        </ModalBox>
      </Modal>
      <Modal
        open={openPartyChat}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <ModalBox position={'absolute'} width={'800px'} height={'600px'}>
          <ChatList url={params.url} name={partyName} />
          <ChatBox url={params.url} name={partyName} />
        </ModalBox>
      </Modal>
    </Box>
  );
};

export default PartyPage;
