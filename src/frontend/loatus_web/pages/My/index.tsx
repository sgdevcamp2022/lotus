import React, { useCallback, useEffect } from 'react';
import axios, { AxiosResponse } from 'axios';
import useInput from '@hooks/useInput';
import { Link, Navigate, useSearchParams } from 'react-router-dom';
import { Button, Header, Horizon, Hr, Input, Page, PageHead, Root, SignIn } from '@pages/Login/styles';
import { APIItem, IToken, IUser } from '@typings/db';
import useSWR from 'swr';
import { useCookies } from 'react-cookie';
import { Row, Col, Form} from 'react-bootstrap';
import { Container } from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import useToken from '@hooks/useToken';
import useSWRRetry from '@hooks/useSWRRetry';
import useTokenAxios from '@hooks/useTokenAxios';








const My = () => {
  const [token, setToken] = useCookies(['refreshToken']);
  const [accessToken, setAccessToken] = useToken();
  const { data: userData, error, mutate } = useSWRRetry('/auth/my', accessToken, setAccessToken, token.refreshToken);
  const [params, setParams] = useSearchParams();
  const toUserId="1";
  const [nickname, onChangeNickname, setNickname] = useInput('');
//  const profileImage="\""+userData.profileImage+"\"";

console.log(accessToken);

useEffect(() => {
  if (params.get('accessToken')) {
    setAccessToken(params.get('accessToken'));
  }
  if (params.get('refreshToken')) {
    setToken('refreshToken', params.get('refreshToken'));
  }
}, []);

const onSubmitUpdateNickname = useCallback(
  async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await useTokenAxios(accessToken, setAccessToken, token.refreshToken)
      .post(
        '/user/update/nickname',
        {
          nickname
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
  [nickname],
);


const onSubmitCharacterInfo = useCallback(
  async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await useTokenAxios(accessToken, setAccessToken, token.refreshToken)
      .post(
        '/user/load/maincharacter',
        {
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
  [],
);



const onSubmitFriendList = useCallback(
  async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await useTokenAxios(accessToken, setAccessToken, token.refreshToken)
      .post(
        '/friend/list',
        {
          toUserId
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
    await useTokenAxios(accessToken, setAccessToken, token.refreshToken)
      .post(
        '/friend/list',
        {
          toUserId
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
      <td>[ ]</td>
      </tr>

      <tr>
      <td>캐릭터명</td>
      <td>{userData.characterName}</td>
      </tr>

      <tr>
      <td>아이템 레벨</td>
      <td>1578.12</td>
      </tr>

      <tr>
      <td>클래스</td>
      <td>바드</td>
      </tr>

      <tr>
      <td>서버명</td>
      <td>아만</td>
      </tr>

      <tr>
      <td>닉네임</td>
      <td>{userData.nickname}</td>   
      </tr>

    </table>

    <Form onSubmit={onSubmitUpdateNickname}>
      <Input placeholder={'닉네임'} type="input" value={nickname} onChange={onChangeNickname} />
      <Button type="submit">변경</Button>
          </Form>

    <div className="col">
      프로필 사진
    </div>
    <div className="col">
      [Lv.50
    {userData.characterName}
      ]
    </div>
    <div className="col">
    <Button variant="outline-dark">정보수정</Button>
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
