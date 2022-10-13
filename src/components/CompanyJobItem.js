import React, { useEffect, useState } from 'react';
import Moment from 'react-moment';
import styled from 'styled-components';
import ActiveSwitch from './ActiveSwitch';
import ReadMore from './ReadMore';
import {
  collection,
  onSnapshot,
  query,
  where,
  orderBy,
} from 'firebase/firestore';

import { doc, updateDoc } from 'firebase/firestore';
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from 'firebase/storage';
import { db, storage } from '../firebase';
import Badge from '@mui/material/Badge';

function CompanyJobItem({ job, handleOpen }) {
  const [applicants, setApplicants] = useState([]);

  useEffect(() => {
    const jobRef = `${job.postByCompanyRef + job.id}`;
    console.log(jobRef);
    const appCol = collection(db, 'applications', jobRef, 'apps');
    const q = query(appCol, orderBy('appliedOn', 'asc'));

    const unsub = onSnapshot(q, (querySnapshot) => {
      let _apps = [];
      console.log('q', querySnapshot);

      querySnapshot.forEach((doc) => {
        let data = {};
        data = doc.data();
        data.id = doc.id;
        _apps.push(data);
      });
      setApplicants(_apps);
    });

    return () => unsub();
  }, []);

  return (
    <div
      style={{
        border: '2px solid #5e76bf',
        borderRadius: 10,
        padding: 8,
        marginBottom: 10,
        display: 'flex',
      }}>
      <div>
        <Header>
          <div style={{ flex: 1 }}>
            <Title>{job.jobTitle} </Title>
            <div>
              <h4 style={{ fontWeight: 'normal', margin: 0 }}>
                {job.companyName} - {job.companyUrl}
              </h4>
            </div>
          </div>
          <div style={{ flex: 1 }}>
            <JobDesc>
              Employment Type:{' '}
              <span style={{ fontWeight: 'normal' }}>{job.employmentType}</span>
            </JobDesc>
            <JobDesc>
              Location:{' '}
              <span style={{ fontWeight: 'normal' }}>{job.location}</span>
            </JobDesc>
            <JobDesc>
              Salary: <span style={{ fontWeight: 'normal' }}>{job.salary}</span>
            </JobDesc>
          </div>
        </Header>
        <ReadMore>{job.jobSummary}</ReadMore>
        <div
          style={{
            marginTop: 10,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <small>
            Created: <Moment fromNow>{job.createdAt.toDate()}</Moment>
          </small>
          <ActiveSwitch isActive={job.active} jobId={job.id} />
        </div>
      </div>
      <div>
        <BtnContainer>
          <Btn onClick={() => handleOpen(job)}>View</Btn>
          <Btn>Applicants - {applicants.length}</Btn>
          <Btn>Edit</Btn>
          <Btn style={{ color: 'red' }}>Delete</Btn>
        </BtnContainer>
      </div>
    </div>
  );
}

export default CompanyJobItem;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Title = styled.h4`
  margin: 0 0 10px;
`;

const JobDesc = styled.h4`
  margin: 0;
`;

const BtnContainer = styled.div`
  width: 150px;
  border-left: 2px solid;
  height: 100%;
`;

const Btn = styled.div`
  text-align: center;
  font-size: 14px;
  font-weight: bold;
  color: darkblue;
  cursor: pointer;
  padding: 10px;
  border-bottom: 1px solid;
`;
