import Container from '@mui/material/Container';
import styled from 'styled-components';
import React from 'react';
import ProfileDisplay from '../components/ProfileDisplay';
import { auth } from '../firebase';
import { Link } from 'react-router-dom';
import { useMediaQuery } from '../hooks/media';

const Profile = () => {
  const isMobile = useMediaQuery('(max-width: 768px)');

  return (
    <Container>
      <Wrapper isMobile={isMobile}>
        <div style={{ margin: 10, textAlign: 'right' }}>
          <Link to="/create-profile">Edit</Link>
        </div>
        <ProfileDisplay userId={auth.currentUser.uid} editable={true} />
      </Wrapper>
    </Container>
  );
};

export default Profile;

const Wrapper = styled.div`
  padding: ${({ isMobile }) => (isMobile ? '0px' : '40px')};
`;
