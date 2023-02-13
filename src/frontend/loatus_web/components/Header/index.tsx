import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import useToken from '@hooks/useToken';
import { useCookies } from 'react-cookie';
import useSWRRetry from '@hooks/useSWRRetry';
import { useCallback } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const pages = [
  { name: '파티', param: '/party' },
  { name: '커뮤니티', param: '/board/lists' },
  { name: '공지사항', param: '/notice' },
];

function Header() {
  const [accessToken, setAccessToken] = useToken();
  const [token] = useCookies(['refreshToken']);
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
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
  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'Noto Sans KR, sans-serif',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOATUS
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                component={Link}
                key={page.name}
                to={page.param}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page.name}
              </Button>
            ))}
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            {userData ? (
              <>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: '45px' }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <MenuItem component={Link} to="/mypage" onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">프로필</Typography>
                  </MenuItem>
                  <MenuItem onClick={onClickLogout}>
                    <Typography textAlign="center">로그아웃</Typography>
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <Typography
                textAlign="center"
                variant="h6"
                noWrap
                component={Link}
                to={'/login'}
                sx={{
                  mr: 2,
                  display: { xs: 'none', md: 'flex' },
                  fontFamily: 'Noto Sans KR, sans-serif',
                  fontWeight: 700,
                  letterSpacing: '.3rem',
                  color: 'inherit',
                  textDecoration: 'none',
                }}
              >
                로그인
              </Typography>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Header;
