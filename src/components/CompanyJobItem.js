import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import Moment from 'react-moment';
import styled from 'styled-components';
import { useMediaQuery } from '../hooks/media';
import ActiveSwitch from './ActiveSwitch';
import ReadMore from './ReadMore';
import CompanyJobItemHeader from './CompanyJobItemHeader';
import EditIcon from '@mui/icons-material/Edit';
import PeopleIcon from '@mui/icons-material/People';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Delete from '../components/svg/Delete';

import { db } from '../firebase';

function CompanyJobItem({ job, handleOpenJobView, handleShowApplicants }) {
  const [applicants, setApplicants] = useState([]);
  const isMobile = useMediaQuery('(max-width: 768px)');

  useEffect(() => {
    const jobRef = `${job.postByCompanyRef + job.id}`;
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
    <Body>
      <div style={{ flex: 1 }}>
        <CompanyJobItemHeader job={job} />
        {/* <ReadMore>{job.jobSummary}</ReadMore> */}
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
      <RightMenu>
        <BtnContainer isMobile={isMobile}>
          <Btn isMobile={isMobile} onClick={() => handleOpenJobView(job)}>
            {isMobile ? <VisibilityIcon /> : 'View'}
          </Btn>
          <Btn
            isMobile={isMobile}
            onClick={() => handleShowApplicants(job, applicants)}>
            {isMobile ? <PeopleIcon /> : 'Applicants'} - {applicants.length}
          </Btn>
          <Btn isMobile={isMobile}>{isMobile ? <EditIcon /> : 'Edit'}</Btn>
          <Btn isMobile={isMobile} style={{ color: 'red' }}>
            {isMobile ? <Delete /> : 'Delete'}
          </Btn>
        </BtnContainer>
      </RightMenu>
    </Body>
  );
}

export default CompanyJobItem;

const Body = styled.div`
  border: 2px solid #5e76bf;
  padding: 8px;
  display: flex;
`;

const RightMenu = styled.div``;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: ${({ isMobile }) => isMobile && `column`};
`;

const JobItemDetails = styled.div`
  flex: 1;
  margin-top: ${({ isMobile }) => isMobile && `10px`};
`;
const Title = styled.h4`
  margin: 0 0 10px;
`;

const JobDesc = styled.h4`
  margin: 0;
`;

const BtnContainer = styled.div`
  width: ${({ isMobile }) => (isMobile ? `85px` : `150px`)};
  border-left: 2px solid rgb(94, 118, 191);
  height: 100%;
  margin-left: 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  padding-left: 10px;
`;

const Btn = styled.div`
  text-align: center;
  font-size: 14px;
  font-weight: bold;
  color: darkblue;
  cursor: pointer;
  padding: ${({ isMobile }) => (isMobile ? `10px` : `0`)};
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;

  &:hover {
    background: #f0f0f0;
  }
`;
