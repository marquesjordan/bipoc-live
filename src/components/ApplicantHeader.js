import React from 'react';
import { useNavigate } from 'react-router-dom';
import Img from '../avatar.jpg';
import styled from 'styled-components';

const ApplicantHeader = ({ user, onClick }) => {
  const navigate = useNavigate();

  return (
    <Container onClick={onClick}>
      <div className="img_container">
        <img src={user.avatar || Img} alt="avatar" />
        <div className="overlay">
          <div>
            <input
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              id="photo"
              onChange={(e) => null}
            />
          </div>
        </div>
      </div>
      <div style={{ fontSize: 12 }}>
        <h3>{user.name}</h3>
        <h4>{user.email}</h4>
      </div>
    </Container>
  );
};

export default ApplicantHeader;

const Container = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid;

  &:hover {
    background-color: #f0f0f0;
    cursor: pointer;
  }
`;
