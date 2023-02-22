import React, { useCallback, useState } from 'react';
import { useCookies } from 'react-cookie';
import useSWRRetry from '@hooks/useSWRRetry';
import { Channel, Party } from '@typings/partyDB';
import { Outlet, useNavigate, useParams } from 'react-router';
import { Badge, Tab, Tabs } from '@mui/material';
import useInput from '@hooks/useInput';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { IUser } from '@typings/db';
import MessageIcon from '@mui/icons-material/Message';
import axios from 'axios';

const Channels = () => {
  const navigate = useNavigate();
  const [token] = useCookies(['refreshToken']);
  const {
    data: userData,
    error: userError,
    mutate: userMutate,
  } = useSWRRetry<IUser>(process.env.REACT_APP_DB_HOST + '/auth/my', token.refreshToken);
  const params = useParams();
  const {
    data: channels,
    error: channelsError,
    mutate: channelsMutate,
  } = useSWRRetry<Channel[]>(process.env.REACT_APP_DB_HOST + '/api/channels', token.refreshToken);
  const [value, onChangeValue, setValue] = useInput(0);
  const [navValue, onChangeNavValue, setNavValue] = useInput(0);
  const {
    data: myPartiesData,
    error: myPartiesError,
    mutate: myPartiesMutate,
  } = useSWRRetry<Party[]>(
    userData ? process.env.REACT_APP_DB_HOST + `/api/channels/${params.url}/parties/my/${userData.userId}` : null,
    token.refreshToken,
  );

  return (
    <>
      <Tabs value={value} onChange={onChangeValue} aria-label="basic tabs example">
        {channels?.map((channel, key) => (
          <Tab
            label={channel.name}
            id={`tab-${key}`}
            key={key}
            aria-controls={`tabpanel-${key}`}
            onClick={() => {
              setValue(key);
              navigate(`/channels/${channel.url}/parties`);
            }}
          />
        ))}
      </Tabs>
      <Outlet />
      <BottomNavigation
        showLabels
        value={navValue}
        onChange={(event, newValue) => {
          setNavValue(newValue);
        }}
      >
        {myPartiesData?.map((party, key) => (
          <BottomNavigationAction
            key={key}
            label={party.name}
            icon={
              <Badge
                badgeContent={
                  <>
                    {async () => {
                      const res: number = await axios
                        .get(process.env.REACT_APP_DB_HOST + `/api/channels/${params.url}/parties/${party.name}/unread`)
                        .then((res) => res.data)
                        .catch((err) => 0);
                      return res;
                    }}
                  </>
                }
                color="primary"
              >
                <MessageIcon />
              </Badge>
            }
          />
        ))}
      </BottomNavigation>
    </>
  );
};

export default Channels;
