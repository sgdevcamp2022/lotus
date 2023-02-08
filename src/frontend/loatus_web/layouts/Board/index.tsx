import React from 'react';
import { Container } from 'react-bootstrap';
import { Outlet } from 'react-router';

const Community = () => {
  return (
    <Container>
      <Outlet />
    </Container>
  );
};

export default Community;
