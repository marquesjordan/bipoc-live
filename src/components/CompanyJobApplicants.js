import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useMediaQuery } from '../hooks/media';
import CompanyJobItemHeader from './CompanyJobItemHeader';

import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '../firebase';
import ApplicantHeader from './ApplicantHeader';

function CompanyJobApplicants({ job, applicants, handleBack }) {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    const usersRef = collection(db, 'users');
    let _users = [];

    applicants.forEach((item) => {
      const q = query(usersRef, where('uid', '==', item.userRef));
      console.log(q);
      const unsub = onSnapshot(q, (querySnapshot) => {
        querySnapshot.forEach((doc) => {
          _users.push(doc.data());
        });
        console.log(_users);
        setUserList(_users);
      });

      return () => unsub();
    });
  }, [applicants]);

  return (
    <>
      <BackButton onClick={handleBack}>{'<< BACK'}</BackButton>
      <Body>
        <div style={{ flex: 1, paddingBottom: 20, borderBottom: '1px solid' }}>
          <CompanyJobItemHeader job={job} />
        </div>
      </Body>
      <AppBody>
        <div
          style={{
            flexBasis: 350,
            borderRight: '2px solid',
            height: 450,
          }}>
          {userList.map((item) => {
            return <ApplicantHeader user={item} />;
          }, [])}
        </div>
        <div></div>
      </AppBody>
    </>
  );
}

export default CompanyJobApplicants;

const Body = styled.div`
  display: flex;
`;

const AppBody = styled.div`
  border: 2px solid #5e76bf;
  display: flex;
`;

const ListContainer = styled.div`
  flex-basis: 350px;
  border-right: 2px solid;
  height: 450px;
`;

const BackButton = styled.div`
  font-weight: bold;
  color: blue;
  cursor: pointer;
  margin-bottom: 10px;

  &:hover {
    color: lightblue;
  }
`;
