import Container from '@mui/material/Container';
import React from 'react';
import ProfileDisplay from '../components/ProfileDisplay';
import { auth } from '../firebase';

const Profile = () => {
  return (
    <Container style={{ padding: `40px 0` }}>
      <ProfileDisplay userId={auth.currentUser.uid} editable={true} />
    </Container>
  );
};

export default Profile;
