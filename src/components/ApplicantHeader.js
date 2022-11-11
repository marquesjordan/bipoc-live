import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Img from '../avatar.jpg';
import { db } from '../firebase';

const ApplicantHeader = ({ user, onClick }) => {
  const navigate = useNavigate();

  const [profileData, setProfileData] = useState([]);

  useEffect(() => {
    getDoc(doc(db, 'profiles', user.uid)).then((docSnap) => {
      if (docSnap.exists) {
        setProfileData(docSnap.data());
      }
    });
  }, [user]);

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
      {profileData.displayName && profileData.title && (
        <div style={{ fontSize: 12 }}>
          <h2 style={{ margin: 0, lineHeight: 1.3 }}>
            {profileData.displayName}
          </h2>
          <h3 style={{ margin: 0, lineHeight: 1.3 }}>{profileData.title}</h3>
        </div>
      )}
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
