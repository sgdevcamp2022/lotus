import React, { useCallback, useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import useInput from '@hooks/useInput';
import { Link, Navigate, useSearchParams } from 'react-router-dom';
import { Button, Header, Horizon, Hr, Input, Page, PageHead, Root, SignIn } from '@pages/Login/styles';
import { APIItem, Friend, IToken, IUser } from '@typings/db';
import useSWR from 'swr';
import { useCookies } from 'react-cookie';
import { Row, Col, Form } from 'react-bootstrap';
import { Container } from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import useToken from '@hooks/useToken';
import useSWRRetry from '@hooks/useSWRRetry';
import useTokenAxios from '@hooks/useTokenAxios';
import { lostarkInfo } from '@typings/db';
import Avatar from '@mui/material/Avatar';
import gravatar from 'gravatar';

const My = () => {
  const [token, setToken] = useCookies(['refreshToken']);
  const accessToken = localStorage.getItem('accessToken');
  const { data: userData, error, mutate } = useSWRRetry('/auth/my', token.refreshToken);
  const [params, setParams] = useSearchParams();
  const toUserId = '1';
  const [nickname, onChangeNickname, setNickname] = useInput('');
  const [characterInfo, setCharacterInfo] = useState<lostarkInfo | null>();
  const [friendList, setFriendList] = useState<Friend[] | null | undefined>();
  //  const profileImage="\""+userData.profileImage+"\"";

  console.log(friendList);
  console.log(friendList && friendList[0]);
  // console.log(friendList.length);

  useEffect(() => {
    axios
      .post(
        '/user/load/maincharacter',
        {},
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
      }),
      [];
  }, []);

  useEffect(() => {
    axios
      .post(
        '/friend/list',
        {
          toUserId,
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
        toast.error(err.message, {
          position: 'top-right',
        });
      }),
      [];
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

  const onSubmitCharacterInfo = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await useTokenAxios(token.refreshToken)
      .post(
        '/user/load/maincharacter',
        {},
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
  }, []);

  const onSubmitFriendList = useCallback(
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

  if (!userData) {
    return <Navigate to={'/login'} />;
  }

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
                  src={userData?.profileImage || gravatar.url(userData.email, { s: '25', d: 'retro' })}
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
              <td>친구수</td>
              <td>{friendList && friendList[0].friendCount}</td>
            </tr>
          </table>

          <table>
            <tr>
              <th>친구 목록</th>
            </tr>
          </table>

          <Form onSubmit={onSubmitUpdateNickname}>
            <Input placeholder={'닉네임'} type="input" value={nickname} onChange={onChangeNickname} />
            <Button type="submit">변경</Button>
          </Form>

          <div className="col">프로필 사진</div>
          <div className="col">
            [Lv.50
            {userData?.characterName}]
          </div>
          <div className="col">
            <Button>정보수정</Button>
          </div>
        </Row>
      </Container>

      <Container maxWidth={false}>
        <div>
          친구목록
          <Form onSubmit={onSubmitFriendList}>
            <Button type="submit">친구목록</Button>
          </Form>
        </div>

        <div>
          친구요청목록
          <Form onSubmit={onSubmitFriendAcceptList}>
            <Button type="submit">친구요청목록</Button>
          </Form>
        </div>

        <div>
          캐릭터 정보
          <Form onSubmit={onSubmitCharacterInfo}>
            <Button type="submit">캐릭터정보</Button>
          </Form>
        </div>
      </Container>
    </Root>
  );
};

export default My;
