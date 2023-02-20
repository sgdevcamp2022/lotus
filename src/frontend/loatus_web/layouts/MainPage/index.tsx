import React from 'react';
import { ToastContainer } from 'react-toastify';
import { Outlet } from 'react-router';
import Header from '@components/Header';
import { Container, createTheme, Grid, ThemeProvider } from '@mui/material';

const MainPage = () => {
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
          <Grid item xs display={'flex'} justifyContent={'center'} alignItems={'center'}>
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
