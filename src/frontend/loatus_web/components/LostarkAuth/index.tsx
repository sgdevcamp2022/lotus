import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { Button, Card, Col, Container, Form, InputGroup, Row } from 'react-bootstrap';
import axios, { AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import useInput from '@hooks/useInput';
import { APIItem, IUser, lostarkInfo } from '@typings/db';
import useToken from '@hooks/useToken';
import useTokenAxios from '@hooks/useTokenAxios';
import { useCookies } from 'react-cookie';

const LostarkAuth = () => {
  const [accessToken, setAccessToken] = useToken();
  const [token, setToken] = useCookies(['refreshToken']);
  const [randomCode, setRandomCode] = useState('');
  const [stoveUrl, onChangeStoveUrl, setStoveUrl] = useInput('');
  const config = useMemo(
    () => ({
      withCredentials: true,
      headers: {
        Authorization: 'Bearer ' + accessToken,
      },
    }),
    [accessToken],
  );
  useEffect(() => {
    useTokenAxios(accessToken, setAccessToken, token.refreshToken)
      .get('/auth/randomcode', config)
      .then((response: AxiosResponse<APIItem<string>>) => {
        setRandomCode(response.data.data);
      })
      .catch((error) => {
        toast.error('인증번호를 불러올 수 없습니다.', {
          position: 'top-right',
        });
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
      useTokenAxios(accessToken, setAccessToken, token.refreshToken)
        .post(
          '/auth/stove',
          {
            randomCode,
            stoveUrl,
          },
          config,
        )
        .then((response: AxiosResponse<APIItem<lostarkInfo>>) => {
          if (response.data.code === 200) {
            toast.success(response.data.message, {
              position: 'top-right',
            });
          } else {
            toast.error(response.data.message, {
              position: 'top-right',
            });
            return;
          }
          console.log(response.data.data);
        })
        .catch((error) => {
          toast.error('오류가 발생했습니다.\n기술팀에 문의해주세요!', {
            position: 'top-right',
          });
        });
    },
    [randomCode, stoveUrl],
  );
  return (
    <Container>
      <Row xs="1" md="3" className="g-4">
        <Col>
          <Card>
            <Card.Img variant="top" src="" />
            <Card.Body>
              <Card.Title>스토브 로그인</Card.Title>
              <Card.Text>
                스토브 사이트에 로그인 해 주세요!
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
                    <Form.Control value={stoveUrl} onChange={onChangeStoveUrl} aria-label="Text input with button" />
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
    </Container>
  );
};

export default LostarkAuth;
