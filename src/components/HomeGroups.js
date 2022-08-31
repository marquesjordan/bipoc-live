import React from 'react';
import styled from 'styled-components';
import UserCard from './UserCard';
import CompanyCard from './CompanyCard';
import Container from '@mui/material/Container';

import { Link } from 'react-router-dom';

function HomeGroups(props) {
  return (
    <GroupsContainer>
      <Container style={{ display: 'flex', flexDirection: 'column' }}>
        <h2 style={{ textAlign: 'center', color: '#000' }}>
          Explore the possibilities.
        </h2>
        <RowContainer>
          <h3 style={{ color: '#000' }}>Community</h3>
          <GroupRow>
            <UserCard />
            <UserCard />
            <UserCard />
          </GroupRow>
          <div style={{ margin: '10px 0' }}>
            <Link to="/communiy" style={{ fontSize: 18 }}>
              See more
            </Link>
          </div>
        </RowContainer>
        <RowContainer>
          <h3 style={{ color: '#000' }}>Companies</h3>
          <GroupRow>
            <CompanyCard />
            <CompanyCard />
            <CompanyCard />
          </GroupRow>
          <div style={{ margin: '10px 0' }}>
            <Link to="/communiy" style={{ fontSize: 18 }}>
              See more
            </Link>
          </div>
        </RowContainer>
      </Container>
    </GroupsContainer>
  );
}

export default HomeGroups;

const GroupsContainer = styled.div`
  display: flex;
  padding: 25px 0 50px;
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
