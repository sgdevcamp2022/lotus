import React, { useCallback, useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import useInput from '@hooks/useInput';
import { Link, Navigate, useSearchParams } from 'react-router-dom';
import { Button, Header, Horizon, Hr, Input, Page, PageHead, Root, SignIn } from '@pages/Login/styles';
import { APIItem, Friend, IToken, IUser } from '@typings/db';
import useSWR from 'swr';
import { useCookies } from 'react-cookie';
import { Row, Col, Form } from 'react-bootstrap';
import { Container,CircularProgress } from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import useToken from '@hooks/useToken';
import useSWRRetry from '@hooks/useSWRRetry';
import useTokenAxios from '@hooks/useTokenAxios';
import {lostarkInfo } from '@typings/db';
import Avatar from '@mui/material/Avatar';
import gravatar from 'gravatar';

const My = () => {
  const [token, setToken] = useCookies(['refreshToken']);
  const accessToken = localStorage.getItem('accessToken');
  const { data: userData, error, mutate } = useSWRRetry('/auth/my', token.refreshToken);
  const [params, setParams] = useSearchParams();
  const toUserId = '1';
  const [nickname, onChangeNickname, setNickname] = useInput('');
  const [characterInfo, setCharacterInfo] = useState<lostarkInfo|null>();
  const [friendList, setFriendList] = useState<Friend[]|null|undefined>();
  //  const profileImage="\""+userData.profileImage+"\"";

  console.log(friendList);
  console.log(friendList && friendList[0]);
 // console.log(friendList.length);



useEffect(() => {
  axios
  .post(
    '/user/load/maincharacter',{

    },
    {
      headers: {
        Authorization: 'Bearer ' + accessToken,
      },
    },
  )
  .then((res) => {
    setCharacterInfo(res.data.data);
  })
  .catch((err) => {
    toast.error(err.message, {
      position: 'top-right',
    });
  }),[]
}, []);


useEffect(() => {
  axios
  .post(
    '/friend/list',{
      toUserId
    },
    {
      headers: {
        Authorization: 'Bearer ' + accessToken,
      },
    },
  )
  .then((res) => {
    setFriendList(res.data.data);
  })
  .catch((err) => {

  }),[]
}, []);

  const onSubmitUpdateNickname = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      await useTokenAxios(token.refreshToken)
        .post(
          '/user/update/nickname',
          {
            nickname,
          },
          {
            withCredentials: true,
            headers: {
              Authorization: 'Bearer ' + accessToken,
            },
          },
        )
        .then((response) => {
          if (response.data.code === 200) {
            toast.success('닉네임 변경이 성공했습니다.', {
              position: 'top-right',
            });
          } else {
            toast.error('닉네임 변경이 실패했습니다.', {
              position: 'top-right',
            });
          }
        })
        .catch((error) => {
          toast.error('닉네임 변경이 실패했습니다.', {
            position: 'top-right',
          });
        });
    },
    [nickname],
  );

  

  const onSubmitFriendAcceptList = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      await useTokenAxios(token.refreshToken)
        .post(
          '/friend/list',
          {
            toUserId,
          },
          {
            withCredentials: true,
            headers: {
              Authorization: 'Bearer ' + accessToken,
            },
          },
        )
        .then((response) => {
          if (response.data.code === 200) {
            toast.success('글쓰기가 성공했습니다.', {
              position: 'top-right',
            });
          } else {
            toast.error('글쓰기가 실패했습니다.', {
              position: 'top-right',
            });
          }
        })
        .catch((error) => {
          toast.error('글쓰기가 실패했습니다.', {
            position: 'top-right',
          });
        });
    },
    [toUserId],
  );

  return (
    <Root>
      <Container maxWidth={false}>
        <Row>
          <table>
            <tr>
              <td>프로필 사진</td>
              <td>
              <Avatar
                alt={userData?.characterName || userData?.nickname}
                src={userData?.profileImage || gravatar.url(userData?.email, { s: '25', d: 'retro' })}
                    />
              </td>
            </tr>

            <tr>
              <td>캐릭터명</td>
              <td>{characterInfo?.CharacterName}</td>
            </tr>

            <tr>
              <td>아이템 레벨</td>
              <td>{characterInfo?.ItemAvgLevel}</td>
            </tr>

            <tr>
              <td>클래스</td>
              <td>{characterInfo?.CharacterClassName}</td>
            </tr>

            <tr>
              <td>서버명</td>
              <td>{characterInfo?.ServerName}</td>
            </tr>

            <tr>
              <td>닉네임</td>
              <td>{userData?.nickname}</td>
            </tr>

            <tr>
              <td>친구 수</td>
              <td>{friendList && friendList[0].friendCount}</td>
            </tr>
          </table>


          

          <Form onSubmit={onSubmitUpdateNickname}>
            <Input placeholder={'닉네임'} type="input" value={nickname} onChange={onChangeNickname} />
            <Button type="submit">변경</Button>
          </Form>

        </Row>
      </Container>

      <Container maxWidth={false}>
      <table>
            <tr>
            <th>친구 목록</th>
            </tr>
            {friendList ? (
            friendList.map((friend, key) => {
              return (
                <tr>
                  <td>{friend.nickname}</td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan={1}>
                <CircularProgress />
              </td>
            </tr>
          )}
           
            
          </table>

        <div>
          친구요청목록
        </div>

        <div>
          캐릭터 정보
        </div>
      </Container>
    </Root>
  );
};

export default My;
