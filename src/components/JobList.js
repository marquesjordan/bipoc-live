import React from 'react';
import Moment from 'react-moment';
import styled from 'styled-components';
import ActiveSwitch from './ActiveSwitch';
import EmptyBox from './EmptyBox';
import ReadMore from './ReadMore';

function JobList({ company, onShowForm, jobs = [] }) {
  return (
    <div>
      <AddBtnContainer>
        <AddBtn role="button" onClick={onShowForm}>
          + Add Job
        </AddBtn>
      </AddBtnContainer>
      {jobs.length === 0 && <EmptyBox text="No Jobs" />}
      {jobs.map((job) => {
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
                  <span style={{ fontWeight: 'normal' }}>
                    {job.employmentType}
                  </span>
                </JobDesc>
                <JobDesc>
                  Location:{' '}
                  <span style={{ fontWeight: 'normal' }}>{job.location}</span>
                </JobDesc>
                <JobDesc>
                  Salary:{' '}
                  <span style={{ fontWeight: 'normal' }}>{job.salary}</span>
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
        );
      })}
    </div>
  );
}

export default JobList;

const AddBtnContainer = styled.div`
  text-align: right;
  padding: 10px 0;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Title = styled.h2`
  margin: 0 0 10px;
`;

const AddBtn = styled.a`
  color: blue;
  cursor: pointer;
`;

const JobDesc = styled.h3`
  margin: 0;
`;

const Status = styled.small`
  font-weight: bold;
  color: ${(props) => (props.active ? 'green' : 'red')};
`;
