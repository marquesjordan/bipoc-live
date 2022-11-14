import React, { useState } from 'react';
import styled from 'styled-components';
import UserCard from './UserCard';
import CompanyCard from './CompanyCard';
import { useMediaQuery } from '../hooks/media';
import Container from '@mui/material/Container';
import { addDoc, collection, Timestamp } from 'firebase/firestore';
import { auth, db } from '../firebase';

import { Link } from 'react-router-dom';

function Subscribe(props) {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log('try');
      await addDoc(collection(db, 'subscription'), {
        email,
        createdAt: Timestamp.fromDate(new Date()),
      });

      setEmail('');
      // navigate('/company');
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  return (
    <SubscriptionContainer>
      <Container style={{ display: 'flex', flexDirection: 'column' }}>
        <h2 style={{ textAlign: 'center', color: '#000' }}>Stay Connected</h2>
        <p style={{ textAlign: 'center' }}>
          Please submit your email for updates. Thank you for visiting.
        </p>
        <FormRow isMobile={isMobile}>
          <div className="input_container">
            <input
              type="text"
              name="Email"
              placeholder="Add Email Address"
              value={email}
              onChange={handleChange}
            />
          </div>
          <div>
            <button onClick={handleSubmit} className="btn">
              Subscirbe
            </button>
          </div>
        </FormRow>
      </Container>
    </SubscriptionContainer>
  );
}

export default Subscribe;

const SubscriptionContainer = styled.div`
  display: flex;
  padding: 25px 0 50px;
  background-color: #746ca466;
`;

const RowContainer = styled.div`
  margin-bottom: 30px;
`;

const GroupRow = styled.div`
  display: flex;
  justify-content: space-between;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const FormRow = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: ${({ isMobile }) => (isMobile ? `column` : `row`)};
  width: ${({ isMobile }) => (isMobile ? `90%` : `60%`)};
  margin: auto;
  align-items: center;

  div {
    margin: 0;
  }

  button {
    margin-left: 10px;
    margin-top: ${({ isMobile }) => (isMobile ? '10px' : '0')};
  }

  & input {
    margin: 0 !important;
    width: 100%;
  }
`;
