import React from 'react';
import { ToastContainer } from 'react-toastify';
import LostarkAuth from '@components/LostarkAuth';
import { Outlet } from 'react-router';
import Header from '@components/Header';
import useToken from '@hooks/useToken';
import useSWRRetry from '@hooks/useSWRRetry';
import { useCookies } from 'react-cookie';
import { Container, createTheme, Grid, ThemeProvider } from '@mui/material';
import Pagination from '@mui/material/Pagination';

const MainPage = () => {
  const [accessToken, setAccessToken] = useToken();
  const [token] = useCookies(['refreshToken']);
  const { data: userData, error, mutate } = useSWRRetry('/auth/my', accessToken, setAccessToken, token.refreshToken);
  const darkTheme = createTheme({
    palette: {
      primary: {
        main: '#525252',
        contrastText: '#000000',
      },
    },
  });

  return (
    <div>
      <ThemeProvider theme={darkTheme}>
        <Header />
        <Grid container spacing={2} style={{ paddingTop: '4rem' }}>
          <Grid xs display={'flex'} justifyContent={'center'} alignItems={'center'}>
            <main role="main">
              <Outlet />
            </main>
          </Grid>
        </Grid>
        <ToastContainer />
      </ThemeProvider>
    </div>
  );
};

export default MainPage;
