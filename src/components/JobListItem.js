import React from 'react';
import Moment from 'react-moment';
import styled from 'styled-components';

const JobListItem = ({ job, selectJob, user1, selectedGig, jobId }) => {
  return (
    <Container
      job={job}
      selectedGig={selectedGig}
      onClick={() => selectJob(job)}>
      {console.log('lslsl', jobId)}
      <div style={{ fontSize: 22, color: '#483d8b', fontWeight: 'bold' }}>
        {job.jobTitle}
      </div>
      <div style={{ fontWeight: 'bold' }}>{job.companyName}</div>
      <div>
        {job.location} ({job.employmentType})
      </div>
      <div style={{ marginTop: 8 }}>
        <small>
          Created: <Moment fromNow>{job.createdAt.toDate()}</Moment>
        </small>
      </div>
    </Container>
  );
};

export default JobListItem;

const Container = styled.div`
  border: 1px solid;
  padding: 5px;
  cursor: pointer;
  background-color: ${({ selectedGig, job }) => {
    if (
      selectedGig &&
      selectedGig.createdAt.seconds === job.createdAt.seconds
    ) {
      return 'lightgrey';
    }

    return `#fff`;
  }};
`;
