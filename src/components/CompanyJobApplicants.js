import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useMediaQuery } from '../hooks/media';
import CompanyJobItemHeader from './CompanyJobItemHeader';

import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '../firebase';
import ApplicantHeader from './ApplicantHeader';
import ProfileDisplay from './ProfileDisplay';

function CompanyJobApplicants({ job, applicants, handleBack }) {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [userList, setUserList] = useState([]);
  const [showProfile, setShowProfile] = useState(null);

  useEffect(() => {
    const usersRef = collection(db, 'users');
    let _users = [];

    applicants.forEach((item) => {
      const q = query(usersRef, where('uid', '==', item.userRef));
      const unsub = onSnapshot(q, (querySnapshot) => {
        querySnapshot.forEach((doc) => {
          _users.push(doc.data());
        });
        setUserList(_users);
      });

      return () => unsub();
    });
  }, [applicants]);

  const handleClick = (item) => {
    setShowProfile(item);
  };

  return (
    <Container>
      <div style={{ marginBottom: 25 }}>
        <BackButton onClick={handleBack}>{'RETURN TO JOBS'}</BackButton>
      </div>
      <Body>
        <div style={{ flex: 1, paddingBottom: 20 }}>
          <CompanyJobItemHeader job={job} />
        </div>
      </Body>
      <AppBody>
        <AppList isMobile={isMobile} showProfile={showProfile}>
          <AppHeader>Applicants</AppHeader>
          <div>
            {userList.map((item) => {
              return (
                <ApplicantHeader
                  onClick={() => handleClick(item)}
                  user={item}
                />
              );
            }, [])}
          </div>
        </AppList>
        <AppProfileBody isMobile={isMobile} showProfile={showProfile}>
          <div isMobile={isMobile} style={{ padding: isMobile ? 0 : 4 }}>
            {showProfile && (
              <>
                <ProfileDisplay
                  userId={showProfile.uid}
                  closeProfile={() => setShowProfile(null)}
                  showClose={true}
                />
              </>
            )}
          </div>
        </AppProfileBody>
      </AppBody>
    </Container>
  );
}

export default CompanyJobApplicants;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const CloseButton = styled.div`
  margin: 12px;
  color: blue;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    color: lightblue;
  }
`;

const Body = styled.div`
  display: flex;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const AppList = styled.div`
  flex-basis: ${({ isMobile }) => (isMobile ? `100%` : `350px`)};
  border-right: ${({ isMobile }) => (isMobile ? `0` : `2px solid;`)};
  display: ${({ isMobile, showProfile }) => isMobile && showProfile && `none`};
`;

const AppProfileBody = styled.div`
  flex: 1;
  padding: ${({ isMobile }) => (isMobile ? '0' : `16px;`)};
  overflow: auto;
  max-height: 100%;
  display: ${({ isMobile, showProfile }) => isMobile && !showProfile && `none`};
  background: #ededed;
`;

const AppBody = styled.div`
  border: 2px solid #5e76bf;
  display: flex;

  flex: 1;
  background: #fff;
  max-height: 80%;
`;

const AppHeader = styled.div`
  background: #5e76bf;
  color: #fff;
  font-weight: bold;
  padding: 8px;
  margin-bottom: 4px;
`;

const BackButton = styled.span`
  font-weight: bold;
  color: blue;
  cursor: pointer;
  border: 1px solid blue;
  padding: 5px;

  &:hover {
    color: lightblue;
  }
`;
