import React from 'react';
import Moment from 'react-moment';
import styled from 'styled-components';
import ActiveSwitch from './ActiveSwitch';
import ReadMore from './ReadMore';

function CompanyJobItem({ job, handleOpen }) {
  return (
    <div
      style={{
        border: '2px solid #5e76bf',
        borderRadius: 10,
        padding: 8,
        marginBottom: 10,
      }}>
      <Header>
        <div style={{ flex: 1 }}>
          <Title>{job.jobTitle} </Title>
          <div>
            <h3 style={{ fontWeight: 'normal', margin: 0 }}>
              {job.companyName} - {job.companyUrl}
            </h3>
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
      <hr />
      <BtnContainer>
        <Btn onClick={() => handleOpen(job)}>View Job</Btn>
        <Btn>Applicants</Btn>
        <Btn style={{ color: 'red' }}>Delete Job</Btn>
      </BtnContainer>
    </div>
  );
}

export default CompanyJobItem;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Title = styled.h2`
  margin: 0 0 10px;
`;

const JobDesc = styled.h3`
  margin: 0;
`;

const BtnContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
`;

const Btn = styled.div`
  font-size: 20px;
  font-weight: bold;
  color: blue;
  cursor: pointer;
`;
