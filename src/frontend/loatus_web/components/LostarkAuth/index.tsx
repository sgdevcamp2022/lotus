import React, { useCallback, useEffect, useState } from 'react';
import { Button, Card, Col, Container, Form, InputGroup, Row } from 'react-bootstrap';
import axios, { AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import useInput from '@hooks/useInput';
import { useCookies } from 'react-cookie';
import { lostarkInfo } from '@typings/db';

const LostarkAuth = () => {
  const [cookie, setCookie] = useCookies(['accessToken']);
  const [randomCode, setRandomCode] = useState('');
  const [stoveUrl, onChangeStoveUrl, setStoveUrl] = useInput('');
  useEffect(() => {
    axios
      .get('/auth/randomcode', {
        withCredentials: true,
        headers: {
          Authorization: 'Bearer ' + cookie.accessToken,
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
        .post(
          '/auth/stove',
          {
            randomCode,
            stoveUrl,
          },
          {
            headers: {
              Authorization: 'Bearer ' + cookie.accessToken,
            },
            withCredentials: true,
          },
        )
        .then((response: AxiosResponse<lostarkInfo>) => {
          //TODO 서버에서 캐릭터 정보 받아오기 만들어야 함.
          toast.success(response.data.message, {
            position: 'top-right',
          });
        })
        .catch((error) => {
          toast.error('인증이 완료되지 않았습니다', {
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
