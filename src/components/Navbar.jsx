import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { auth, db } from '../firebase';
import { signOut } from 'firebase/auth';
import { updateDoc, doc } from 'firebase/firestore';
import { AuthContext } from '../context/auth';
import { useNavigate } from 'react-router-dom';
import MenuDrawer from './MenuDrawer';
import Container from '@mui/material/Container';
import styled from 'styled-components';

const Navbar = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const handleSignout = async () => {
    await updateDoc(doc(db, 'users', user.uid), {
      isOnline: false,
    });
    signOut(auth);
    navigate('/login');
  };

  return (
    <nav>
      <h3 className="nav_title">
        <MenuDrawer />
        <Link to="/">BIPOC</Link>
      </h3>
      <BtnContainer>
        {user ? (
          <>
            <Link to="/profile">Profile</Link>
            <button className="btn" onClick={handleSignout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/register">Register</Link>
            <Link to="/login">Login</Link>
          </>
        )}
      </BtnContainer>
    </nav>
  );
};

export default Navbar;

const BtnContainer = styled.div`
  padding: 0 15px;
`;
