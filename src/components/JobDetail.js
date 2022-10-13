import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import BusinessIcon from '@mui/icons-material/Business';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import React from 'react';
import styled from 'styled-components';
import Button from '@mui/material/Button';
import { db, auth, storage } from '../firebase';

import {
  collection,
  query,
  where,
  onSnapshot,
  addDoc,
  Timestamp,
  orderBy,
  setDoc,
  doc,
  getDoc,
  updateDoc,
} from 'firebase/firestore';

const JobDetail = ({ selectedGig }) => {
  const userId = auth.currentUser.uid;
  const handleSubmit = async (e) => {
    e.preventDefault();

    const appRef = `${selectedGig.postByCompanyRef + selectedGig.id}`;
    const stamp = Timestamp.fromDate(new Date());

    await addDoc(collection(db, 'applications', appRef, 'apps'), {
      userRef: userId,
      jobRef: selectedGig.id,
      companyRef: selectedGig.postByCompanyRef,
      appliedOn: stamp,
    });

    await addDoc(collection(db, 'users', userId, 'applications'), {
      appRef,
      jobRef: selectedGig.id,
      companyRef: selectedGig.postByCompanyRef,
      appliedOn: stamp,
    });
  };

  return (
    <>
      <h1>{selectedGig.jobTitle}</h1>
      <JobDetailItem>
        <BusinessIcon />
        <JobDetailText>
          {selectedGig.companyName}
          {' - '}
          <a href={selectedGig.companyUrl}>{selectedGig.companyUrl}</a>
        </JobDetailText>
      </JobDetailItem>
      <JobDetailItem>
        <LocationOnIcon />
        <JobDetailText>
          {selectedGig.location} ({selectedGig.employmentType})
        </JobDetailText>
      </JobDetailItem>
      <JobDetailItem>
        <AttachMoneyIcon />
        <JobDetailText>Salary: {selectedGig.salary}</JobDetailText>
      </JobDetailItem>
      <hr />
      <>
        <Button onClick={handleSubmit} variant="contained">
          Apply
        </Button>
        <hr />
      </>
      <h3>Job Description</h3>
      <div style={{ whiteSpace: 'pre-wrap' }}>{selectedGig.jobSummary}</div>
      {selectedGig.qualifications?.length > 0 && (
        <div>
          <h3>Qualifications</h3>
          <ul>
            {selectedGig.qualifications.map((item) => {
              return <li>{item}</li>;
            })}
          </ul>
        </div>
      )}
      {selectedGig.duties?.length > 0 && (
        <div>
          <h3>Duties</h3>
          <ul>
            {selectedGig.duties.map((item) => {
              return <li>{item}</li>;
            })}
          </ul>
        </div>
      )}
    </>
  );
};

export default JobDetail;

const JobDetailItem = styled.div`
  font-size: 18px;
  margin-bottom: 5px;
  display: flex;
`;

const JobDetailText = styled.div`
  margin-left: 10px;
`;
