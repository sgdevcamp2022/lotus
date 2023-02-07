import React, { useContext } from 'react';
import { Button, Carousel, Col, Form, InputGroup, Pagination, Row, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import { APIItem, IPost, IUser } from '@typings/db';
import makedate from '@utils/makedate';
import axios from 'axios';
import useToken from '@utils/useToken';

const PostLists = () => {
  const [accessToken] = useToken();
  const { data: PostData, error, mutate } = useSWR<IPost[] | null>(['/post/'], fetcher);

  return (
    <>
      <h3>게시판</h3>
      <Carousel style={{ margin: '25px' }}>
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
          <Link to={'/board/write'}>
            <Button>글쓰기</Button>
          </Link>
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
            {PostData?.map((post, key) => {
              return (
                <tr>
                  <td>{key}</td>
                  <td>{post.title}</td>
                  <td>{post.author.nickname}</td>
                  <td>{post.content}</td>
                  <td>{makedate(post.published_date)}</td>
                  <td>
                    <Button>수정</Button>
                    <Button
                      onClick={() =>
                        axios
                          .delete(`/post/delete/${post.id}`, {
                            headers: {
                              Authorization: 'Bearer ' + accessToken,
                            },
                          })
                          .then((response) => {
                            mutate();
                          })
                          .catch((error) => {})
                      }
                    >
                      신고
                    </Button>
                  </td>
                </tr>
              );
            })}
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
    </>
  );
};

export default PostLists;
