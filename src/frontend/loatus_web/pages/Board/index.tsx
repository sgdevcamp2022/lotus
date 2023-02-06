import React, { useCallback } from 'react';
import { Button, Carousel, Col, Container, Form, InputGroup, Pagination, Row, Table } from 'react-bootstrap';

const Community = () => {
  const onClickRegist = useCallback(() => {}, []);

  return (
    <Container>
      <h3>게시판</h3>
      <Carousel>
        <Carousel.Item>
          <img
            className={'d-block w-100'}
            src={'https://i.ytimg.com/vi/MYYj727uuV4/maxresdefault.jpg'}
            width={'800'}
            height={'400'}
            alt={'First slide'}
          />
          <Carousel.Caption>
            <h3>글 쓸 사람</h3>
            <p>나야 나 나야 나</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
      <Row>
        <Col md={4}>
          <InputGroup>
            <Form.Control aria-label="Text input" />
            <Button>검색</Button>
          </InputGroup>
        </Col>
        <Col md={{ span: 4, offset: 4 }} style={{ textAlign: 'end' }}>
          <Button>글쓰기</Button>
        </Col>
      </Row>
      <Row style={{ marginTop: 50 }}>
        <Table hover>
          <thead>
            <tr>
              <th>No</th>
              <th>TITLE</th>
              <th>AUTHOR</th>
              <th>CONTENT</th>
              <th>PUBLISHED_DATE</th>
              <th>MANAGEMENT</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>생존 인증</td>
              <td>백수3세</td>
              <td>냉무</td>
              <td>2023.02.03</td>
              <td>
                <Button>수정</Button>
                <Button>신고</Button>
              </td>
            </tr>
          </tbody>
        </Table>
      </Row>
      <Pagination className="justify-content-md-center">
        <Pagination.First disabled />
        <Pagination.Prev disabled />
        <Pagination.Item>{1}</Pagination.Item>
        <Pagination.Ellipsis />
        <Pagination.Next />
        <Pagination.Last />
      </Pagination>
    </Container>
  );
};

export default Community;
