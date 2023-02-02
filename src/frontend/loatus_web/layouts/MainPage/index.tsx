import React, { useCallback, useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import useSWR from 'swr';
import { IUser, lostarkInfo } from '@typings/db';
import fetcher from '@utils/fetcher';
import { useCookies } from 'react-cookie';
import { toast, ToastContainer } from 'react-toastify';
import {
  Button,
  Card,
  Form,
  Col,
  Container,
  InputGroup,
  Nav,
  Navbar,
  NavDropdown,
  NavLink,
  Row,
  SplitButton,
} from 'react-bootstrap';
import gravatar from 'gravatar';
import useInput from '@hooks/useInput';

export const MainPage = () => {
  const [cookie, setCookie] = useCookies(['accessToken']);
  const {
    data: userData,
    error,
    mutate,
  } = useSWR<IUser | undefined | null>(cookie.accessToken ? ['/auth/my', cookie.accessToken] : null, fetcher);
  const [randomCode, setRandomCode] = useState('');
  const [stoveUrl, onChangeStoveUrl, setStoveUrl] = useInput('');

  useEffect(() => {
    axios
      .get('/auth/randomcode', {
        withCredentials: true,
        headers: {
          authorization: cookie.accessToken,
        },
      })
      .then((response) => {
        setRandomCode(response.data);
      })
      .catch((error) => {
        toast.error('인증번호를 불러올 수 없습니다.', {
          position: 'top-right',
        });
        console.dir(error);
      });
  }, []);

  const onClickCopyClipBoard = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(randomCode);
      toast.success('인증코드가 클립보드에 복사되었습니다', {
        position: 'top-right',
      });
    } catch (e) {
      toast.error('복사에 실패했습니다.', {
        position: 'top-right',
      });
    }
  }, [randomCode]);

  const onSubmitAuthInfo = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      axios
        .post('/auth/stove', {
            randomCode,
            stoveUrl,
        }, {
          headers: {
            authorization: cookie.accessToken
          },
          withCredentials: true
        })
        .then((response: AxiosResponse<lostarkInfo>) => {
          //TODO 서버에서 캐릭터 정보 받아오기 만들어야 함.
          toast.success(response.data.message, {
            position: 'top-right',
          });
          alert(response.data.object || '아무것도 없습니다');
        })
        .catch((error) => {
          toast.error('인증이 완료되지 않았습니다', {
            position: 'top-right',
          });
        });
    },
    [randomCode, stoveUrl],
  );

  const onClickLogout = useCallback(() => {
    axios
      .post(
        '/auth/logout',
        {
          //logout data
        },
        {
          withCredentials: true,
        },
      )
      .then((response) => {
        toast.success('로그아웃에 성공했습니다.', {
          position: 'top-right',
        });
        setCookie('accessToken', '');
      })
      .catch((error) => {
        toast.error('로그아웃에 실패했습니다.', {
          position: 'top-right',
        });
      });
  }, []);

  return (
    <div>
      <header role="banner">
        <Navbar bg="light" expand="lg">
          <Container>
            <Navbar.Brand href={'/'}>Loatus</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="/login">홈</Nav.Link>
                <Nav.Link href="/party">모집</Nav.Link>
                <Nav.Link href="/community">커뮤니티</Nav.Link>
                <Nav.Link href="/post">공지사항</Nav.Link>
              </Nav>
              <Nav>
                {userData ? (
                  <NavDropdown
                    title={
                      <span>
                        {/*TODO 아래 예외조건 삭제해야 합니다.*/}
                        <img src={gravatar.url(userData?.email, { s: '25', d: 'retro' })} alt={'avatar'} />
                        &nbsp;{userData?.nickname}
                      </span>
                    }
                    id={'userinfo'}
                  >
                    <NavDropdown.Item eventKey={'mypage'} href={'/mypage'}>
                      마이페이지
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item eventKey={'logout'} onClick={onClickLogout}>
                      로그아웃
                    </NavDropdown.Item>
                  </NavDropdown>
                ) : (
                  <Nav.Link href={'/login'}>로그인</Nav.Link>
                )}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>
      <main role="main">
        <Container>
          {/*TODO 인증 완료 후 받아오는 userData에서 인증됨을 증명하는 수단 찾기*/}
          {userData && (
            <section>
              <h1>인증하기</h1>
              <Row xs="1" md="3" className="g-4">
                <Col>
                  <Card>
                    <Card.Img variant="top" src="" />
                    <Card.Body>
                      <Card.Title>스토브 로그인</Card.Title>
                      <Card.Text>
                        <p>스토브 사이트에 로그인 해 주세요!</p>
                        <Button onClick={() => window.open('https://www.onstove.com/')}>스토브 가기</Button>
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
                <Col>
                  <Card>
                    <Card.Img variant="top" src="" />
                    <Card.Body>
                      <Card.Title>타임라인 게시</Card.Title>
                      <Card.Text>
                        인증코드를 타임라인에 게시해 주세요!
                        <InputGroup className="mb-3">
                          <Form.Control readOnly value={randomCode || 'Error'} aria-label="Text input with button" />
                          <Button id="segmented-button-1" onClick={onClickCopyClipBoard}>
                            복사
                          </Button>
                        </InputGroup>
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
                <Col>
                  <Card>
                    <Card.Img variant="top" src="" />
                    <Card.Body>
                      <Card.Title>인증하기</Card.Title>
                      <Card.Text>
                        타임라인을 게시한 주소를 적어주세요!
                        <Form onSubmit={onSubmitAuthInfo}>
                          <InputGroup className="mb-3">
                            <Form.Control
                              value={stoveUrl}
                              onChange={onChangeStoveUrl}
                              aria-label="Text input with button"
                            />
                            <Button type="submit" id="segmented-button-2">
                              제출
                            </Button>
                          </InputGroup>
                        </Form>
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </section>
          )}
          <section>모집</section>
          <section>오늘 할 일</section>
          <section>공지</section>
        </Container>
      </main>

      <ToastContainer />
    </div>
  );
};
