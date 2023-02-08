import React, { useCallback } from 'react';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import gravatar from 'gravatar';
import axios from 'axios';
import { toast } from 'react-toastify';
import useToken from '@hooks/useToken';
import { Link } from 'react-router-dom';
import { HeaderNavLink } from '@components/Header/styles';
import { useCookies } from 'react-cookie';
import useSWRRetry from '@hooks/useSWRRetry';

const Header = () => {
  const [accessToken, setAccessToken] = useToken();
  const [token] = useCookies(['refreshToken']);

  const { data: userData, error, mutate } = useSWRRetry('/auth/my', accessToken, setAccessToken, token.refreshToken);

  const onClickLogout = useCallback(() => {
    axios
      .get('/auth/logout', {
        headers: {
          Authorization: 'Bearer ' + accessToken,
        },
        withCredentials: true,
      })
      .then((response) => {
        toast.success(response.data.message, {
          position: 'top-right',
        });
        mutate(null);
      })
      .catch((error) => {
        toast.error('오류가 발생했습니다.\n기술팀에 문의하세요!', {
          position: 'top-right',
        });
      });
  }, []);
  return (
    <header role="banner">
      <Navbar bg="light" expand="lg" style={{ marginBottom: 20 }}>
        <Container fluid>
          <Navbar.Brand>
            <Link to={'/'}>Loatus</Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <HeaderNavLink>
                <Link to={'/'}>홈</Link>
              </HeaderNavLink>
              <HeaderNavLink>
                <Link to={'/party'}>모집</Link>
              </HeaderNavLink>
              <HeaderNavLink>
                <Link to={'/board/lists'}>커뮤니티</Link>
              </HeaderNavLink>
              <HeaderNavLink>
                <Link to={'/notice'}>공지사항</Link>
              </HeaderNavLink>
            </Nav>
            <Nav>
              {userData ? (
                <NavDropdown
                  title={
                    <span>
                      <img
                        src={
                          userData?.profile_image
                            ? userData?.profile_image
                            : gravatar.url(userData?.email, { s: '25', d: 'retro' })
                        }
                        width={'25'}
                        height={'25'}
                        alt={'avatar'}
                      />
                      &nbsp;{userData?.nickname}
                    </span>
                  }
                  id={'userinfo'}
                >
                  <NavDropdown.Item href={'/mypage'}>마이페이지</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={onClickLogout}>로그아웃</NavDropdown.Item>
                </NavDropdown>
              ) : (
                <HeaderNavLink>
                  <Link to={'/login'}>로그인</Link>
                </HeaderNavLink>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
