import React, { useCallback, useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import useInput from '@hooks/useInput';
import { Link, Navigate, useSearchParams } from 'react-router-dom';
import { Button, Header, Horizon, Hr, Input, Page, PageHead, Root, SignIn } from '@pages/Login/styles';
import { APIItem, Friend, IToken, IUser } from '@typings/db';
import useSWR from 'swr';
import { useCookies } from 'react-cookie';
import { Row, Col, Form } from 'react-bootstrap';
import { Container, CircularProgress } from '@mui/material';
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
  const { data: userData, error, mutate } = useSWRRetry(process.env.REACT_APP_DB_HOST + '/auth/my', token.refreshToken);
  const {
    data: characterInfo,
    error: mainCharError,
    mutate: mainCharMutate,
  } = useSWRRetry<lostarkInfo>(process.env.REACT_APP_DB_HOST + '/user/load/maincharacter', token.refreshToken, true);
  const {
    data: friendList,
    error: friendError,
    mutate: friendMutate,
  } = useSWRRetry<Friend[]>(process.env.REACT_APP_DB_HOST + '/friend/list', token.refreshToken, true);
  const {
    data: friendRequestList,
    error: friendRequestError,
    mutate: friendRequestMutate,
  } = useSWRRetry<Friend[]>(process.env.REACT_APP_DB_HOST + '/friend/request/list', token.refreshToken, true);
  const [nickname, onChangeNickname, setNickname] = useInput('');
  const [friendId, setFriendId] = useState<number>(0);

  const onSubmitUpdateNickname = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      await useTokenAxios(token.refreshToken)
        .post(process.env.REACT_APP_DB_HOST + '/user/update/nickname', {
          nickname,
        })
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

  const onSubmitDeleteUser = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await useTokenAxios(token.refreshToken)
      .post(process.env.REACT_APP_DB_HOST + '/user/delete', {})
      .then((response) => {
        if (response.data.code === 200) {
          toast.success('회원탈퇴가 성공했습니다.', {
            position: 'top-right',
          });
        } else {
          toast.error('회원탈퇴가 실패했습니다.', {
            position: 'top-right',
          });
        }
      })
      .catch((error) => {
        toast.error('회원탈퇴가 실패했습니다.', {
          position: 'top-right',
        });
      });
  }, []);

  const onSubmitDeleteFriend = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      await useTokenAxios(token.refreshToken)
        .post(process.env.REACT_APP_DB_HOST + '/friend/delete', {
          toUserId: friendId,
        })
        .then((response) => {
          if (response.data.code === 200) {
            toast.success('친구삭제가 성공했습니다.', {
              position: 'top-right',
            });
          } else {
            toast.error('친구삭제가 실패했습니다.', {
              position: 'top-right',
            });
          }
        })
        .catch((error) => {
          toast.error('친구삭제가 실패했습니다.', {
            position: 'top-right',
          });
        });
    },
    [friendId],
  );

  const onSubmitAcceptFriend = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      await useTokenAxios(token.refreshToken)
        .post(
          process.env.REACT_APP_DB_HOST + '/friend/accept',
          {
            toUserId: friendId,
          },
          {
            withCredentials: false,
            headers: {
              Authorization: 'Bearer ' + accessToken,
            },
          },
        )
        .then((response) => {
          if (response.data.code === 200) {
            toast.success('친구수락이 성공했습니다.', {
              position: 'top-right',
            });
          } else {
            toast.error('친구수락이 실패했습니다.', {
              position: 'top-right',
            });
          }
        })
        .catch((error) => {
          toast.error('친구수락이 실패했습니다.', {
            position: 'top-right',
          });
        });
    },
    [friendId],
  );

  const onSubmitRefuseFriend = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      await useTokenAxios(token.refreshToken)
        .post(
          process.env.REACT_APP_DB_HOST + '/friend/refuse',
          {
            toUserId: friendId,
          },
          {
            withCredentials: false,
            headers: {
              Authorization: 'Bearer ' + accessToken,
            },
          },
        )
        .then((response) => {
          if (response.data.code === 200) {
            toast.success('친구거절이 성공했습니다.', {
              position: 'top-right',
            });
          } else {
            toast.error('친구거절이 실패했습니다.', {
              position: 'top-right',
            });
          }
        })
        .catch((error) => {
          toast.error('친구거절이 실패했습니다.', {
            position: 'top-right',
          });
        });
    },
    [friendId],
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

            {/* <tr>
              <td>친구 수</td>
              <td>{friendList && friendList[0].friendCount}</td>
            </tr> */}
          </table>

          <Form onSubmit={onSubmitUpdateNickname}>
            <Input placeholder={'닉네임'} type="input" value={nickname} onChange={onChangeNickname} />
            <Button type="submit">변경</Button>
          </Form>

          <Form onSubmit={onSubmitDeleteUser}>
            <Button type="submit">회원탈퇴</Button>
          </Form>
        </Row>
      </Container>

      <Container maxWidth={false}>
        <table>
          <tr>
            <th>친구 목록</th>
            <th></th>
            <th></th>
          </tr>
          {friendList ? (
            friendList.map((friend, key) => {
              return (
                <tr>
                  <td>{friend.nickname}</td>
                  <td>{friend.characterName}</td>
                  <td>
                    <Form onSubmit={onSubmitDeleteFriend}>
                      <Button type="submit" onClick={() => setFriendId(friend.userId)}>
                        삭제
                      </Button>
                    </Form>
                  </td>
                  <td>
                    <Form>
                      <Button type="submit">채팅</Button>
                    </Form>
                  </td>
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

        <table>
          <tr>
            <th>친구요청 목록</th>
            <th></th>
            <th></th>
            <th></th>
          </tr>
          {friendRequestList ? (
            friendRequestList.map((friend, key) => {
              return (
                <tr>
                  <td>
                    {friend.nickname}({friend.characterName})
                  </td>
                  <td>
                    <Form onSubmit={onSubmitAcceptFriend}>
                      <Button type="submit" onClick={() => setFriendId(friend.userId)}>
                        수락
                      </Button>
                    </Form>
                  </td>
                  <td>
                    <Form onSubmit={onSubmitRefuseFriend}>
                      <Button type="submit" onClick={() => setFriendId(friend.userId)}>
                        거절
                      </Button>
                    </Form>
                  </td>
                  <td></td>
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
      </Container>
    </Root>
  );
};

export default My;
